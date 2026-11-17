// Converts the raw project PNGs into responsive WebP files.
// node scripts/optimize-assets.mjs <folder-with-pngs>
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = process.argv[2];
const OUT = 'src/assets/img/work';
fs.mkdirSync(OUT, { recursive: true });

// file in the asset pack → project slug + role
const map = {
  'Artboard 1 1.png': ['skoda-imdes', 'cover'],
  'Effects 1.png': ['skoda-imdes', 'mock'],
  'codex-works-coversArtboard-1-copy 1.png': ['levva-gym', 'cover'],
  'Group 1-1 1.png': ['levva-gym', 'mock'],
  'codex-works-coversArtboard-1-copy-2 1.png': ['rihla-travel', 'cover'],
  'Group 1-2 1.png': ['rihla-travel', 'mock'],
  'codex-works-coversArtboard-1-copy-3 1.png': ['ondefoc', 'cover'],
  'Mockup  1.png': ['ondefoc', 'mock'],
  'codex-works-coversArtboard-1-copy-4 1.png': ['valuetherm', 'cover'],
  'Group 1 10.png': ['valuetherm', 'mock'],
  'codex-works-coversArtboard-1-copy-5 1.png': ['erp-bz-telecom', 'cover'],
  'YOUR DESIGN HERE 1.png': ['erp-bz-telecom', 'mock'],
  'codex-works-coversArtboard-1-copy-6 1.png': ['az-fulfillment', 'cover'],
  'Your Design 1.png': ['az-fulfillment', 'mock'],
};

const sizes = { cover: [800, 1600], mock: [600, 1100] };
let total = 0;
for (const [file, [slug, role]] of Object.entries(map)) {
  const input = path.join(SRC, file);
  if (!fs.existsSync(input)) { console.warn('missing', file); continue; }
  // Resize only: never crop or trim, so every image keeps the exact ratio of the owner's file.
  const buf = await sharp(input).toBuffer();
  for (const w of sizes[role]) {
    const out = path.join(OUT, `${slug}-${role}-${w}.webp`);
    await sharp(buf).resize({ width: w, withoutEnlargement: true }).webp({ quality: role === 'cover' ? 80 : 82, alphaQuality: 90, effort: 5 }).toFile(out);
    total += fs.statSync(out).size;
  }
  const meta = await sharp(buf).metadata();
  console.log(slug.padEnd(16), role.padEnd(6), `${meta.width}x${meta.height}`);
}
console.log('total', (total / 1024 / 1024).toFixed(2), 'MB');
