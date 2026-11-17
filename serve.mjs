// Local preview with clean URLs: node serve.mjs → http://localhost:4321/fr
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('dist');
const PORT = process.env.PORT || 4321;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.webmanifest': 'application/manifest+json' };

http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p === '/') { res.writeHead(301, { Location: '/fr' }); return res.end(); }
  if (req.method === 'POST') { res.writeHead(200); return res.end('ok'); }
  const tries = [p, p + '.html', path.join(p, 'index.html')];
  for (const t of tries) {
    const f = path.join(ROOT, t);
    if (f.startsWith(ROOT) && fs.existsSync(f) && fs.statSync(f).isFile()) {
      res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' });
      return fs.createReadStream(f).pipe(res);
    }
  }
  res.writeHead(404, { 'Content-Type': types['.html'] });
  // dist/ may be mid-rebuild: answer the 404 without the page instead of crashing.
  fs.createReadStream(path.join(ROOT, '404.html')).on('error', () => res.end()).pipe(res);
}).listen(PORT, () => console.log(`http://localhost:${PORT}/fr`));
