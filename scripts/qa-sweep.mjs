// Loads every page of the sitemap at desktop and phone width; reports horizontal overflow and JS errors.
// Needs the local server (node serve.mjs). node scripts/qa-sweep.mjs [prefix: /fr | /en | /ar] [base url]
import fs from 'node:fs';
import { chromium } from 'playwright-core';

const prefix = process.argv[2] || '';
const base = process.argv[3] || process.env.BASE || 'http://localhost:4321';
const sm = fs.readFileSync('dist/sitemap.xml', 'utf8');
const urls = [...sm.matchAll(/<loc>https:\/\/codexfrance\.com([^<]*)<\/loc>/g)].map((m) => m[1]).filter((u) => u.startsWith(prefix));
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' });
const bad = [];
for (const [w, h, mobile] of [[1440, 900, false], [390, 844, true]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile });
  const page = await ctx.newPage();
  let errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  for (const u of urls) {
    errs = [];
    await page.goto(base + u, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (overflow > 0 || errs.length) bad.push({ width: w, url: u, overflow, errors: errs });
  }
  await ctx.close();
}
console.log(JSON.stringify({ pages: urls.length, problems: bad }, null, 1));
await browser.close();
