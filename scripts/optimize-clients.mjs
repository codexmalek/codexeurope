// Client logos → trimmed WebP files + transparent silhouettes for the logo band.
// node scripts/optimize-clients.mjs <folder>   (file name = logo id used in src/content.mjs)
//   <id>.webp    original colours on white (testimonial avatars)
//   <id>-m.webp  white silhouette with alpha, used as a CSS mask so logos take the theme colour
//   src/clients.json  aspect ratios, used to give every logo the same visual weight
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = process.argv[2];
const OUT = 'src/assets/img/clients';
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const ratios = {};
// Logos whose colour areas overlap: alpha follows darkness instead, so the shapes stay apart.
const TONAL = ['k-diesel'];
for (const f of fs.readdirSync(SRC).sort()) {
  if (!/\.(png|jpe?g|webp)$/i.test(f)) continue;
  const base = path.basename(f, path.extname(f));
  // Flatten on white, then trim the white margin screenshots usually carry.
  const buf = await sharp(path.join(SRC, f)).flatten({ background: '#ffffff' }).trim({ background: '#ffffff', threshold: 18 }).toBuffer();
  await sharp(buf).resize({ height: 140, width: 360, fit: 'inside', withoutEnlargement: true }).webp({ quality: 88 }).toFile(path.join(OUT, `${base}.webp`));

  // Silhouette: alpha = how far each pixel is from the background colour (top-left pixel).
  const { data, info } = await sharp(path.join(SRC, f)).flatten({ background: '#ffffff' }).raw().toBuffer({ resolveWithObject: true });
  const [br, bg, bb] = [data[0], data[1], data[2]];
  const px = info.width * info.height;
  const rgba = Buffer.alloc(px * 4, 255);
  for (let i = 0; i < px; i++) {
    const [r, g, b] = [data[i * 3], data[i * 3 + 1], data[i * 3 + 2]];
    const a = TONAL.includes(base)
      ? Math.max(0, (255 - (0.299 * r + 0.587 * g + 0.114 * b) - 14) / 200) ** 3
      : (Math.max(Math.abs(r - br), Math.abs(g - bg), Math.abs(b - bb)) - 14) / 70;
    rgba[i * 4 + 3] = Math.round(Math.min(1, Math.max(0, a)) * 255);
  }
  const sil = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).trim({ threshold: 1 }).png().toBuffer();
  const out = await sharp(sil).resize({ height: 200, width: 520, fit: 'inside', withoutEnlargement: true }).webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(OUT, `${base}-m.webp`));
  ratios[base] = +(out.width / out.height).toFixed(3);
  console.log(base.padEnd(26), `${out.width}x${out.height}`);
}
fs.writeFileSync('src/clients.json', JSON.stringify(ratios, null, 1) + '\n');
