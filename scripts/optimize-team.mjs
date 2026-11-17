// Team portraits → responsive WebP (resized only, never cropped).
// node scripts/optimize-team.mjs <folder>   (file name = member id in `team` in src/content.mjs)
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = process.argv[2];
const OUT = 'src/assets/img/team';
fs.mkdirSync(OUT, { recursive: true });
let total = 0;
for (const file of fs.readdirSync(SRC).filter((f) => /\.(webp|png|jpe?g)$/i.test(f))) {
  const id = path.parse(file).name;
  const buf = await sharp(path.join(SRC, file)).toBuffer();
  for (const w of [400, 800]) {
    const out = path.join(OUT, `${id}-${w}.webp`);
    await sharp(buf).resize({ width: w, withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toFile(out);
    total += fs.statSync(out).size;
  }
  console.log(id);
}
console.log('total', (total / 1024).toFixed(0), 'KB');
