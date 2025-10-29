import fs from 'node:fs';
import path from 'node:path';

const LOG_DIR = path.resolve(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'app.log');

let lastErrorTs = 0;
let errorCount = 0;
const ERROR_THROTTLE_MS = 60_000; // report at most once per minute

function reportErrorOnce(err, context = 'logging') {
  const now = Date.now();
  errorCount += 1;
  if (now - lastErrorTs > ERROR_THROTTLE_MS) {
    lastErrorTs = now;
    try {
      console.error(`[${new Date().toISOString()}] ERROR (${context}):`, err?.message || err);
    } catch {}
  }
}

function ensureLogDir() {
  try {
    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }
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
