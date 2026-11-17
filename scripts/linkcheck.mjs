// Checks that every internal href/src in the built site points to an existing page or file.
// node scripts/linkcheck.mjs dist
import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2] || 'dist';
const files = [];
const walk = (d) => fs.readdirSync(d).forEach((f) => { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); });
walk(root);
const exists = (u) => {
  u = u.split('#')[0].split('?')[0];
  if (!u || u === '/') return true;
  const p = path.join(root, u);
  return fs.existsSync(p + '.html') || (fs.existsSync(p) && fs.statSync(p).isFile());
};
const bad = new Map();
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  for (const m of h.matchAll(/(?:href|src)="(\/[^"]*)"/g)) if (!exists(m[1])) (bad.get(m[1]) || bad.set(m[1], new Set()).get(m[1])).add(path.relative(root, f));
}
console.log(files.length, 'pages checked;', bad.size ? 'BROKEN:' : 'no broken internal links');
for (const [k, v] of bad) console.log(' ', k, '<-', [...v].slice(0, 3).join(', '));
