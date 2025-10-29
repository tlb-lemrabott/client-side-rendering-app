import { appendLog } from './fileTransport.js';
let externalLogger = null;

try {
  // Try to use the 'logger' package if present; fall back to console
  const mod = await import('logger');
  externalLogger = (mod && (mod.default || mod)).Logger || (mod && mod.default) || null;
} catch {}

function ts() { return new Date().toISOString(); }
function fmt(level, msg, meta) {
  const m = meta && Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
  return `[${ts()}] ${level.toUpperCase()} ${msg}${m}`;
}

export const log = {
  info(msg, meta = {}) {
    const line = fmt('info', msg, meta);
    try { console.log(line); } catch {}
    appendLog(line);
  },
  warn(msg, meta = {}) {
    const line = fmt('warn', msg, meta);
    try { console.warn(line); } catch {}
    appendLog(line);
  },
  error(msg, meta = {}) {
    const line = fmt('error', msg, meta);
    try { console.error(line); } catch {}
    appendLog(line);
  },
};

