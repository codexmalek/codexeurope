// Generates logo PNGs, favicon.ico and the Open Graph image. Run once: node scripts/make-images.mjs
import fs from 'node:fs';
import sharp from 'sharp';
import { chromium } from 'playwright-core';

const D = fs.readFileSync('src/assets/img/mark.d', 'utf8').trim();
const icon = fs.readFileSync('src/public/favicon.svg');

await sharp(icon).resize(512).png().toFile('src/assets/img/codex-logo.png');
await sharp(icon).resize(180).png().toFile('src/public/apple-touch-icon.png');
const png32 = await sharp(icon).resize(32).png().toBuffer();
// ICO container holding one 32×32 PNG.
const head = Buffer.alloc(22);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4);
head.writeUInt8(32, 6); head.writeUInt8(32, 7); head.writeUInt16LE(1, 10); head.writeUInt16LE(32, 12);
head.writeUInt32LE(png32.length, 14); head.writeUInt32LE(22, 18);
fs.writeFileSync('src/public/favicon.ico', Buffer.concat([head, png32]));

const font = (f) => `url(data:font/woff2;base64,${fs.readFileSync('src/assets/fonts/' + f).toString('base64')})`;
const html = `<!doctype html><html><head><style>
@font-face{font-family:G;src:${font('geist.woff2')};font-weight:100 900}
@font-face{font-family:S;src:${font('instrument-serif-italic.woff2')};font-style:italic}
@font-face{font-family:M;src:${font('geist-mono.woff2')}}
html,body{margin:0;width:1200px;height:630px;background:#0b0b0c;color:#f3f0ea;font-family:G;overflow:hidden}
.g{position:absolute;width:900px;height:900px;right:-300px;top:-420px;border-radius:50%;background:radial-gradient(circle,rgba(254,164,30,.28),transparent 62%)}
svg.m{position:absolute;right:-90px;top:40px;width:560px}
svg.m path{fill:none;stroke:#fea41e;stroke-width:1.4;vector-effect:non-scaling-stroke;opacity:.45}
.top{position:absolute;left:72px;top:64px;display:flex;align-items:center;gap:14px;font-weight:600;font-size:38px;letter-spacing:-.05em}
.top svg{width:40px}
h1{position:absolute;left:72px;bottom:150px;margin:0;font-weight:500;font-size:96px;line-height:.94;letter-spacing:-.055em}
em{font-family:S;font-weight:400;color:#fea41e}
.k{position:absolute;left:72px;bottom:72px;font:500 18px M;letter-spacing:.12em;text-transform:uppercase;color:#b9b5ad;display:flex;gap:12px;align-items:center}
.k i{width:9px;height:9px;border-radius:50%;background:#fea41e}
</style></head><body><div class="g"></div>
<svg class="m" viewBox="-4 0 933 957"><path fill-rule="evenodd" d="${D}"/></svg>
<div class="top"><svg viewBox="-4 0 933 957"><path fill="#fea41e" fill-rule="evenodd" d="${D}"/></svg>codex</div>
<h1>Nous codons l’avenir<br><em>numérique</em> du monde.</h1>
<div class="k"><i></i>Studio logiciel · Web · Mobile — Marseille, depuis 2014</div>
</body></html>`;
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
const shot = await page.screenshot({ type: 'png' });
await sharp(shot).jpeg({ quality: 86, mozjpeg: true }).toFile('src/assets/img/og.jpg');
await browser.close();
console.log('images ok');
