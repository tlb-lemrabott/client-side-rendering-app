// Simple static file server for ui-code (no deps)
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { readFile } from 'node:fs/promises';

const PORT = process.env.UI_PORT || 4000;
const PUBLIC_DIR = new URL('.', import.meta.url).pathname; // ui-code/

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
};

function toFilePath(urlPath) {
  let p = urlPath.split('?')[0];
  if (p === '/' || p === '') p = '/index.html';
  const safe = normalize(p).replace(/^\/+/, '/');
  return join(PUBLIC_DIR, safe);
}

const server = createServer(async (req, res) => {
  try {
    const filePath = toFilePath(req.url || '/');
    const data = await readFile(filePath);
    const ct = MIME[extname(filePath)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': ct });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`UI available at http://localhost:${PORT}`);
});
