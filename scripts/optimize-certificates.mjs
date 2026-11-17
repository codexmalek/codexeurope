// Turns certificate scans into web images + a manifest the build reads.
// node scripts/optimize-certificates.mjs <folder>
// Name each file "Client - Projet - Année.jpg" (PNG/JPG; PDFs need pdftoppm installed).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const SRC = process.argv[2];
const OUT = 'src/assets/img/certificates';
const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const manifest = [];
for (const f of fs.readdirSync(SRC).sort()) {
  const ext = path.extname(f).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp', '.pdf'].includes(ext)) continue;
  const [client, project, year] = path.basename(f, ext).split(' - ').map((x) => x.trim());
  const base = slug(path.basename(f, ext)) || `attestation-${manifest.length + 1}`;
  let input = path.join(SRC, f);
  if (ext === '.pdf') { // first page of the PDF
    const tmp = path.join(OUT, base);
    execFileSync('pdftoppm', ['-png', '-r', '150', '-f', '1', '-l', '1', '-singlefile', input, tmp]);
    input = tmp + '.png';
  }
  for (const w of [480, 1400]) await sharp(input).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(OUT, `${base}-${w}.webp`));
  if (ext === '.pdf') { fs.copyFileSync(path.join(SRC, f), path.join(OUT, `${base}.pdf`)); fs.rmSync(input); }
  const { width, height } = await sharp(path.join(OUT, `${base}-1400.webp`)).metadata();
  manifest.push({ base, client: client || 'Client', project: project || '', year: year || '', width, height, pdf: ext === '.pdf' });
  console.log(base, `${width}x${height}`);
}
fs.writeFileSync('src/certificates.json', JSON.stringify(manifest, null, 2));
console.log(manifest.length, 'attestations →', OUT);
