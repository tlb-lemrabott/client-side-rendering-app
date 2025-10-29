import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersPath = path.resolve(__dirname, '../store/users.json');
let usersCache = null;

function loadUsers() {
  if (usersCache) return usersCache;
  const content = fs.readFileSync(usersPath, 'utf-8');
  const parsed = JSON.parse(content);
  usersCache = new Set(parsed.map((u) => String(u).toLowerCase()));
  return usersCache;
}

export function getUserGreeting(username) {
  const users = loadUsers();
  const key = String(username).toLowerCase();
  if (!users.has(key)) return null;
  const formattedName = key.charAt(0).toUpperCase() + key.slice(1);
  return {
    message: `Hey ${formattedName}, great to see you!`,
  };
}
