const API_BASE = 'http://localhost:3000';

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
  const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data;
}

async function handleSubmit(ev) {
  ev.preventDefault();
  const name = nameEl.value.trim();
  history.replaceState({ name }, '', `#${encodeURIComponent(name)}`);
  setPending('Fetching your message…');
  try {
    const json = await fetchGreeting(name);
    setSuccess(json);
  } catch (err) {
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
  formEl.addEventListener('submit', handleSubmit);

  // Hydrate from URL hash if present to mimic SPA routing state
  const initialName = loadFromHash();
  if (initialName) {
    setPending('Fetching your message…');
    try {
      const json = await fetchGreeting(initialName);
      setSuccess(json);
    } catch (err) {
      setError(err.message);
    }
  } else {
    stateEl.textContent = 'Enter a name and press “Greet me”.';
  }
}

window.addEventListener('DOMContentLoaded', init);

