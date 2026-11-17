// Scrolls a page with the mouse wheel like a visitor (so reveals, pinned sections and counters play)
// and saves one JPEG per screen. Best way to review a whole page, including the RTL Arabic layout.
// node scripts/qa-scroll-shots.mjs <path> [width=1440] [outPrefix=shots/page] [dark|light]
// Git Bash turns "/ar" into a Windows path: run it as  MSYS_NO_PATHCONV=1 node scripts/qa-scroll-shots.mjs /ar
// Tip: tile the shots for review with ffmpeg:  -f concat -i list.txt -vf "scale=960:-1,tile=2x2" t%02d.jpg
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const [, , p = '/fr', width = '1440', out = 'shots/page', mode = 'dark'] = process.argv;
const base = process.env.BASE || 'http://localhost:4321';
const W = +width, H = W < 600 ? 844 : 900;
fs.mkdirSync(path.dirname(out), { recursive: true });
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, isMobile: W < 600, hasTouch: W < 600 });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto(base + p, { waitUntil: 'networkidle' });
if (mode === 'light') await page.evaluate(() => { document.documentElement.dataset.mode = 'light'; });
await page.waitForTimeout(2500);
await page.mouse.move(W / 2, H / 2);
let i = 0, last = -1;
for (;;) {
  await page.screenshot({ path: `${out}-${String(i).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 55 });
  i++;
  for (let k = 0; k < 9; k++) { await page.mouse.wheel(0, H / 9); await page.waitForTimeout(90); }
  await page.waitForTimeout(1300);
  const y = await page.evaluate(() => scrollY);
  if (y === last || i > 40) break;
  last = y;
}
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
console.log(JSON.stringify({ path: p, width: W, shots: i, overflow, errors }));
await browser.close();
