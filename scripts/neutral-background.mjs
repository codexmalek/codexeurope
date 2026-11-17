// Turns a strongly coloured backdrop (e.g. a yellow/orange wall) into studio grey, keeps the person,
// and upscales small photos so they match the other team portraits.
// node scripts/neutral-background.mjs <in> <out> [hueMin=31] [hueMax=58] [minWidth=900]
import sharp from 'sharp';

const [IN, OUT, hMin = 31, hMax = 58, minW = 900] = process.argv.slice(2);
const meta = await sharp(IN).metadata();
const scale = Math.max(1, Number(minW) / meta.width);
const W = Math.round(meta.width * scale), H = Math.round(meta.height * scale);
const { data } = await sharp(IN).removeAlpha().resize(W, H, { kernel: 'lanczos3' }).raw().toBuffer({ resolveWithObject: true });

// 1. Mask of backdrop pixels: hue in the wall's range, strongly saturated, fairly bright.
//    Skin is in a similar hue range but far less saturated, so it is left alone.
const mask = Buffer.alloc(W * H);
for (let i = 0, p = 0; p < W * H; p++, i += 3) {
  const r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  const s = mx ? d / mx : 0;
  let h = 0;
  if (d) h = mx === r ? 60 * (((g - b) / d) % 6) : mx === g ? 60 * ((b - r) / d + 2) : 60 * ((r - g) / d + 4);
  if (h < 0) h += 360;
  // soft ramps: hue (2° each side), saturation (0.40 → 0.52), brightness (0.15 → 0.25)
  const kh = Math.min(1, Math.max(0, (h - hMin) / 2), Math.max(0, (hMax - h) / 2));
  const ks = Math.min(1, Math.max(0, (s - 0.4) / 0.12)), kv = Math.min(1, Math.max(0, (mx - 0.15) / 0.1));
  mask[p] = Math.round(255 * kh * ks * kv);
}
// 2. Feather the mask so edges (hair, shoulders) blend.
// (extractChannel: sharp hands a blurred 1-channel image back as 3 channels otherwise)
const soft = await sharp(mask, { raw: { width: W, height: H, channels: 1 } }).blur(2.2).extractChannel(0).raw().toBuffer();
// A wider halo around the backdrop, to clean the orange fringe left on the edges of hair and clothes.
const near = await sharp(mask, { raw: { width: W, height: H, channels: 1 } }).blur(6).extractChannel(0).raw().toBuffer();
// 3. Replace masked pixels with a neutral grey that keeps the wall's light and shade;
//    in the halo, only remove the colour cast (the pixel keeps its own brightness and detail).
const out = Buffer.alloc(W * H * 3);
for (let i = 0, p = 0; p < W * H; p++, i += 3) {
  const a = soft[p] / 255;
  const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
  const grey = 70 + lum * 0.62; // light studio grey, keeps gradients
  const r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;
  const mx = Math.max(r, g, b), d = mx - Math.min(r, g, b);
  let h = 0;
  if (d) h = mx === r ? 60 * (((g - b) / d) % 6) : mx === g ? 60 * ((b - r) / d + 2) : 60 * ((r - g) / d + 4);
  if (h < 0) h += 360;
  const fringe = near[p] > 25 && h >= hMin - 4 && h <= hMax + 4 && mx && d / mx > 0.18 ? Math.min(1, near[p] / 90) : 0;
  for (let c = 0; c < 3; c++) {
    const v = data[i + c] * (1 - fringe) + lum * fringe;
    out[i + c] = Math.round(v * (1 - a) + grey * a);
  }
}
// Light unsharp mask: restores the crispness lost by upscaling, without inventing detail.
await sharp(out, { raw: { width: W, height: H, channels: 3 } }).sharpen({ sigma: scale > 1.5 ? 1.1 : 0.8, m1: 0.6, m2: 2 }).png().toFile(OUT);
console.log(`${meta.width}x${meta.height} → ${W}x${H}`);
