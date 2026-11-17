// Upload only the dist files that differ from the last successful upload.
//
//   $env:CODEX_FTP_PASS = '...'
//   node scripts/deploy.mjs            # changed files, 6 at a time
//   node scripts/deploy.mjs --dry-run  # print the list, send nothing
//   node scripts/deploy.mjs --all      # send every file
//
// The first run, with no manifest, records the current dist and uploads nothing:
// the live site already matches. The password is read from CODEX_FTP_PASS and never printed.

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const root = path.resolve('dist');
const manifestPath = '.deploy-manifest.json';
const host = 'ftp.codexeurope.com';
const user = process.env.CODEX_FTP_USER || 'c@codexeurope.com';
const pass = process.env.CODEX_FTP_PASS || '';
const args = new Set(process.argv.slice(2));
const dry = args.has('--dry-run');
const all = args.has('--all');
const concurrency = 6;

const hashFile = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');

const walk = (dir) => {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(abs));
    else out.push(abs);
  }
  return out;
};

const previous = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : null;
const files = walk(root).map((abs) => {
  const rel = path.relative(root, abs).replaceAll('\\', '/');
  return { abs, rel, hash: hashFile(abs) };
});

if (!previous && !all) {
  const seeded = Object.fromEntries(files.map((f) => [f.rel, f.hash]));
  fs.writeFileSync(manifestPath, JSON.stringify(seeded));
  console.log(`Recorded ${files.length} files already on the server. Nothing uploaded.`);
  process.exit(0);
}

const pending = files.filter((f) => all || !previous || previous[f.rel] !== f.hash);
console.log(`${pending.length} to upload, ${files.length - pending.length} unchanged`);
if (dry || pending.length === 0) process.exit(0);
if (!pass) {
  console.error('CODEX_FTP_PASS is missing');
  process.exit(1);
}

const redact = (text) => String(text).split(pass).join('***');
const upload = (file) => new Promise((resolve, reject) => {
  const child = spawn('curl.exe', [
    '-sS', '--ftp-create-dirs', '--connect-timeout', '25', '--max-time', '90',
    '-u', `${user}:${pass}`, '-T', file.abs, `ftp://${host}/public_html/${file.rel}`,
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
  let err = '';
  child.stderr.on('data', (chunk) => { err += chunk; });
  child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${file.rel}\n${redact(err)}`))));
});

const manifest = previous ? { ...previous } : {};
let sent = 0;
let cursor = 0;
const failed = [];
const worker = async () => {
  for (;;) {
    const index = cursor++;
    if (index >= pending.length) return;
    const file = pending[index];
    try {
      await upload(file);
      manifest[file.rel] = file.hash;
      sent++;
      if (sent % 25 === 0 || sent === pending.length) console.log(`uploaded ${sent}/${pending.length}`);
    } catch (error) {
      failed.push(error.message);
    }
  }
};

await Promise.all(Array.from({ length: Math.min(concurrency, pending.length) }, worker));
for (const rel of Object.keys(manifest)) {
  if (!files.some((f) => f.rel === rel)) delete manifest[rel];
}
fs.writeFileSync(manifestPath, JSON.stringify(manifest));
if (failed.length) {
  console.error(`uploaded=${sent} failed=${failed.length}`);
  console.error(failed.join('\n'));
  process.exit(1);
}
console.log(`uploaded=${sent} failed=0 of ${pending.length}`);
