import fs from 'node:fs';
import path from 'node:path';

const LOG_DIR = path.resolve(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'app.log');

let lastErrorTs = 0;
const ERROR_THROTTLE_MS = 60_000;

function reportErrorOnce(err, context) {
  const now = Date.now();
  if (now - lastErrorTs > ERROR_THROTTLE_MS) {
    lastErrorTs = now;
    try { console.error(`[${new Date().toISOString()}] UI-LOG ERROR (${context}):`, err?.message || err); } catch {}
  }
}

function ensureLogDir() {
  try {
    if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });
  } catch (err) {
    reportErrorOnce(err, 'ensureLogDir');
  }
}

export function appendLog(line) {
  try {
    ensureLogDir();
    fs.appendFile(LOG_FILE, line + '\n', { encoding: 'utf8' }, (err) => {
      if (err) reportErrorOnce(err, 'appendLog');
    });
  } catch (err) {
    reportErrorOnce(err, 'appendLog-sync');
  }
}

export function getLogFilePath() {
  return LOG_FILE;
}

