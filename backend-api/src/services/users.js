export function getUserGreeting(username) {
  const key = String(username || '').trim();
  if (!key) {
    return { message: 'Hey there, great to see you!' };
  }
  const lower = key.toLowerCase();
  const formattedName = lower.charAt(0).toUpperCase() + lower.slice(1);
  return { message: `Hey ${formattedName}, great to see you!` };
}
