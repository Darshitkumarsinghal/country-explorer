// server/src/utils/sanitize.js
module.exports = {
  safe: (v) => (v === undefined || v === null || (Array.isArray(v) && v.length === 0) ? '—' : v)
};
