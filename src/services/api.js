const DELAY = 500;

function wait(ms = DELAY) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readStore(key, seed) {
  const raw = localStorage.getItem(key);
  if (raw) return JSON.parse(raw);
  localStorage.setItem(key, JSON.stringify(seed));
  return seed;
}

function writeStore(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export const api = { wait, readStore, writeStore };