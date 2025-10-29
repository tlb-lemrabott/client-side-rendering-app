import fs from 'node:fs';
import path from 'node:path';

const LOG_DIR = path.resolve(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'app.log');

function ensureLogDir() {
  try {
    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR, { recursive: true });
    }
  } catch (err) {
    // Swallow errors to avoid breaking the app due to logging
  }
}

export function appendLog(line) {
  try {
    ensureLogDir();
    fs.appendFile(LOG_FILE, line + '\n', { encoding: 'utf8' }, () => {});
  } catch (_err) {
    // Ignore write errors to avoid impacting request handling
  }
}

export function getLogFilePath() {
  return LOG_FILE;
}

