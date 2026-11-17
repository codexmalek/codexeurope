// Screenshots for QA: node scripts/shoot.mjs <outdir> [paths...]
import fs from 'node:fs';
import { chromium } from 'playwright-core';
const out = process.argv[2];
const paths = process.argv.slice(3).length ? process.argv.slice(3) : ['/fr'];
// Uses the cloud container's Chromium when present, else CHROME_PATH, else the installed Google Chrome.
const cloud = '/opt/pw-browsers/chromium';
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : fs.existsSync(cloud) ? { executablePath: cloud } : { channel: 'chrome' });
for (const [name, vp, mobile] of [['d', { width: 1440, height: 900 }, false], ['m', { width: 390, height: 844 }, true]]) {
  const ctx = await browser.newContext({ viewport: vp, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1 });
  if (process.env.MODE) await ctx.addInitScript((m) => { try { localStorage.setItem('cx-mode', m); } catch (e) {} }, process.env.MODE);
  const page = await ctx.newPage();
  page.on('console', (m) => m.type() === 'error' && console.log('console:', m.text()));
  page.on('pageerror', (e) => console.log('pageerror:', e.message));
  for (const p of paths) {
    await page.goto('http://localhost:4321' + p, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3600);
    await page.screenshot({ path: `${out}/${name}${p.replace(/\//g, '_')}-top.png` });
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 500) { await page.mouse.wheel(0, 500); await page.waitForTimeout(120); }
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${out}/${name}${p.replace(/\//g, '_')}-full.png`, fullPage: true });
  }
  await ctx.close();
}
await browser.close();
