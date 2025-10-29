import Logger from 'logger';
import { appendLog } from './fileTransport.js';

// Console logger (category: api)
const consoleLogger = new Logger('api');

function timestamp() {
  return new Date().toISOString();
}

export const log = {
  info: (msg, meta = {}) => {
    const line = `[${timestamp()}] INFO ${msg}` + (Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '');
    try { consoleLogger.info(line); } catch { /* noop */ }
    appendLog(line);
  },
  warn: (msg, meta = {}) => {
    const line = `[${timestamp()}] WARN ${msg}` + (Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '');
    try { consoleLogger.warn(line); } catch { /* noop */ }
    appendLog(line);
  },
  error: (msg, meta = {}) => {
    const line = `[${timestamp()}] ERROR ${msg}` + (Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '');
    try { consoleLogger.error(line); } catch { /* noop */ }
    appendLog(line);
  },
};

