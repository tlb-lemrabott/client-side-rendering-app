import { appendLog } from './fileTransport.js';

function timestamp() {
  return new Date().toISOString();
}

function stringifyMeta(meta) {
  return meta && Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
}

export const log = {
  info: (msg, meta = {}) => {
    const line = `[${timestamp()}] INFO ${msg}${stringifyMeta(meta)}`;
    try { console.log(line); } catch { /* noop */ }
    appendLog(line);
  },
  warn: (msg, meta = {}) => {
    const line = `[${timestamp()}] WARN ${msg}${stringifyMeta(meta)}`;
    try { console.warn(line); } catch { /* noop */ }
    appendLog(line);
  },
  error: (msg, meta = {}) => {
    const line = `[${timestamp()}] ERROR ${msg}${stringifyMeta(meta)}`;
    try { console.error(line); } catch { /* noop */ }
    appendLog(line);
  },
};
