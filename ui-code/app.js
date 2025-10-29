const API_BASE = 'http://localhost:3000';

// Client-side logging: send to UI server for file backup
async function clientLog(level, message, meta = {}) {
  try {
    await fetch('/__log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, message, meta, path: location.pathname + location.hash })
    });
  } catch {}
}

const $ = (sel) => document.querySelector(sel);
const stateEl = $('#state');
const resultEl = $('#result');
const formEl = $('#greet-form');
const nameEl = $('#name');
const submitEl = $('#submit');

function setPending(msg = 'Loading…') {
  stateEl.textContent = msg;
  stateEl.classList.remove('error');
  submitEl.disabled = true;
}

function setError(msg) {
  stateEl.textContent = msg;
  stateEl.classList.add('error');
  submitEl.disabled = false;
  resultEl.hidden = true;
}

function setSuccess(json) {
  stateEl.textContent = 'Done';
  stateEl.classList.remove('error');
  submitEl.disabled = false;
  resultEl.hidden = false;
  resultEl.textContent = JSON.stringify(json, null, 2);
}

async function fetchGreeting(name) {
  const path = name ? `/${encodeURIComponent(name)}` : '/';
  const url = `${API_BASE}${path}`;
  const sentAt = Date.now();
  console.log('[CSR] Request sent', { url, sentAt: new Date(sentAt).toISOString() });
  clientLog('info', 'CSR: request sent to backend', { url, sentAt });
  const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
  const data = await res.json().catch(() => ({}));
  const receivedAt = Date.now();
  const durationMs = receivedAt - sentAt;
  console.log('[CSR] Response received', { status: res.status, durationMs, receivedAt: new Date(receivedAt).toISOString() });
  clientLog('info', 'CSR: response received from backend', { status: res.status, durationMs, receivedAt });
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
}

async function handleSubmit(ev) {
  ev.preventDefault();
  const name = nameEl.value.trim();
  history.replaceState({ name }, '', `#${encodeURIComponent(name)}`);
  console.log('[CSR] Stage: user interaction', { name });
  clientLog('info', 'CSR: user interaction', { name });
  setPending('Fetching your message…');
  try {
    const json = await fetchGreeting(name);
    console.log('[CSR] Stage: DOM update');
    clientLog('info', 'CSR: DOM update success');
    setSuccess(json);
  } catch (err) {
    console.warn('[CSR] Stage: error display', { error: err?.message });
    clientLog('warn', 'CSR: error display', { error: err?.message });
    setError(err.message);
  }
}

function loadFromHash() {
  const h = (location.hash || '').slice(1);
  const name = decodeURIComponent(h);
  if (name) nameEl.value = name;
  return name || '';
}

async function init() {
  console.log('[CSR] Stage: boot');
  clientLog('info', 'CSR: boot');
  formEl.addEventListener('submit', handleSubmit);

  // Hydrate from URL hash if present to mimic SPA routing state
  const initialName = loadFromHash();
  if (initialName) {
    console.log('[CSR] Stage: initial fetch', { initialName });
    clientLog('info', 'CSR: initial fetch', { initialName });
    setPending('Fetching your message…');
    try {
      const json = await fetchGreeting(initialName);
      console.log('[CSR] Stage: DOM update');
      clientLog('info', 'CSR: DOM update success (initial)');
      setSuccess(json);
    } catch (err) {
      console.warn('[CSR] Stage: error display', { error: err?.message });
      clientLog('warn', 'CSR: error display (initial)', { error: err?.message });
      setError(err.message);
    }
  } else {
    stateEl.textContent = 'Enter a name and press “Greet me”.';
  }
}

window.addEventListener('DOMContentLoaded', init);
