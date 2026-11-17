// Turns a plain white backdrop into the light studio grey of the other team portraits.
// Only white connected to the image border is changed (flood fill), so a white shirt stays white.
// node scripts/grey-white-background.mjs <in> <out>
import sharp from 'sharp';

const [IN, OUT] = process.argv.slice(2);
const { data, info } = await sharp(IN).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height;
const white = (p) => {
  const i = p * 3, mx = Math.max(data[i], data[i + 1], data[i + 2]), mn = Math.min(data[i], data[i + 1], data[i + 2]);
  return mx > 215 && mx - mn < 22;
};
// A white shirt can touch the white backdrop through a thin gap (collar tips), so:
// 1. shrink the white areas (erosion) to break thin connections, 2. flood fill from the top, left and right edges,
// 3. grow the result back (dilation), limited to white pixels.
const R = 7;
const isW = new Uint8Array(W * H);
for (let p = 0; p < W * H; p++) isW[p] = white(p) ? 1 : 0;
const integral = (src) => {
  const I = new Uint32Array((W + 1) * (H + 1));
  for (let y = 0; y < H; y++) for (let x = 0, row = 0; x < W; x++) { row += src[y * W + x]; I[(y + 1) * (W + 1) + x + 1] = I[y * (W + 1) + x + 1] + row; }
  return (x0, y0, x1, y1) => I[y1 * (W + 1) + x1] - I[y0 * (W + 1) + x1] - I[y1 * (W + 1) + x0] + I[y0 * (W + 1) + x0];
};
const boxOf = (src) => { const sum = integral(src); return (x, y) => sum(Math.max(0, x - R), Math.max(0, y - R), Math.min(W, x + R + 1), Math.min(H, y + R + 1)); };
const wBox = boxOf(isW);
const core = new Uint8Array(W * H);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const n = (Math.min(W, x + R + 1) - Math.max(0, x - R)) * (Math.min(H, y + R + 1) - Math.max(0, y - R));
  core[y * W + x] = wBox(x, y) === n ? 1 : 0;
}
const seed = new Uint8Array(W * H);
const stack = [];
for (let x = 0; x < W; x++) stack.push(x);
for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);
while (stack.length) {
  const p = stack.pop();
  if (seed[p] || !core[p]) continue;
  seed[p] = 1;
  const x = p % W, y = (p / W) | 0;
  if (x > 0) stack.push(p - 1);
  if (x < W - 1) stack.push(p + 1);
  if (y > 0) stack.push(p - W);
  if (y < H - 1) stack.push(p + W);
}
const sBox = boxOf(seed);
const mask = Buffer.alloc(W * H);
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (isW[y * W + x] && sBox(x, y) > 0) mask[y * W + x] = 255;
const soft = await sharp(mask, { raw: { width: W, height: H, channels: 1 } }).blur(1.6).extractChannel(0).raw().toBuffer();
const out = Buffer.alloc(W * H * 3);
for (let p = 0, i = 0; p < W * H; p++, i += 3) {
  const a = soft[p] / 255;
  const y = p / W / H;
  const grey = 212 - 34 * y; // light at the top, a little darker lower down, like a studio backdrop
  for (let c = 0; c < 3; c++) out[i + c] = Math.round(data[i + c] * (1 - a) + grey * a);
}
await sharp(out, { raw: { width: W, height: H, channels: 3 } }).png().toFile(OUT);
console.log('done', W + 'x' + H);
