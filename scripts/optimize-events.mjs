// Turns event photos into web-ready WebP + a manifest the build reads.
// node scripts/optimize-events.mjs <folder>
// One sub-folder per event (folder name = event name), or file names that start with the event: "web-expo-1.jpg", "afes_3.png", "web summit 2.jpg"…
// Anything that doesn't match a known event is filed under "Événements".
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = process.argv[2];
const OUT = 'src/assets/img/events';
const known = [
  ['web-summit', 'Web Summit'], ['websummit', 'Web Summit'],
  ['web-expo', 'Web Expo'], ['webexpo', 'Web Expo'],
  ['france-export', 'France Export Fair'], ['export-fair', 'France Export Fair'], ['aef', 'France Export Fair'],
  ['afes', 'AFES'],
];
const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-');

const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : /\.(jpe?g|png|webp|heic|avif)$/i.test(f) && files.push(p); } })(SRC);
files.sort();
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const manifest = [];
const count = {};
for (const file of files) {
  const key = slug(path.relative(SRC, file));
  // A sub-folder name is used as the event name ("Web Summit 2026/photo.jpg"); otherwise the file name prefix.
  const folder = path.relative(SRC, path.dirname(file));
  const ev = folder && folder !== '.' ? folder : (known.find(([k]) => key.includes(k)) || [null, 'Événements'])[1];
  count[ev] = (count[ev] || 0) + 1;
  const base = `${slug(ev)}-${String(count[ev]).padStart(2, '0')}`;
  const img = sharp(file).rotate(); // respect phone orientation
  const meta = await img.metadata();
  const portrait = (meta.orientation >= 5 ? meta.width > meta.height : meta.height > meta.width);
  for (const w of [480, 640, 1280]) {
    await sharp(file).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: w === 480 ? 68 : 78, effort: 5 }).toFile(path.join(OUT, `${base}-${w}.webp`));
  }
  const { width, height } = await sharp(path.join(OUT, `${base}-1280.webp`)).metadata();
  manifest.push({ base, event: ev, width, height, portrait });
  console.log(ev.padEnd(20), base, `${width}x${height}`);
}
fs.writeFileSync('src/events.json', JSON.stringify(manifest, null, 2));
console.log(manifest.length, 'photos →', OUT);
