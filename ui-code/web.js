// Simple static file server for ui-code (no deps)
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { readFile } from 'node:fs/promises';
import { log } from './src/logger/index.js';

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
  const start = Date.now();
  const ua = req.headers['user-agent'];
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

  // Client log ingest endpoint
  if (req.method === 'POST' && (req.url || '').startsWith('/__log')) {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      try {
        const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
        const level = body.level || 'info';
        const message = body.message || 'client-log';
        const meta = Object.assign({ source: 'browser', ip, ua, path: body.path }, body.meta || {});
        (log[level] || log.info)(message, meta);
        res.writeHead(204).end();
      } catch (e) {
        log.warn('Failed to parse client log', { error: String(e) });
        res.writeHead(400).end('Bad Request');
      }
    });
    return;
  }

  // Static file serving with request/response logs
  try {
    const filePath = toFilePath(req.url || '/');
    const data = await readFile(filePath);
    const ct = MIME[extname(filePath)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': ct });
    res.end(data);
    const dur = Date.now() - start;
    log.info('UI served file', { method: req.method, path: req.url, status: 200, durMs: dur, ip, ua });
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
    const dur = Date.now() - start;
    log.warn('UI file not found', { method: req.method, path: req.url, status: 404, durMs: dur, ip, ua });
  }
});

server.listen(PORT, () => {
  log.info('UI server started', { url: `http://localhost:${PORT}` });
});
