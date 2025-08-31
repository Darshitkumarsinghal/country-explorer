// server/src/data/restCountriesClient.js
const axios = require('axios');
const { restBase } = require('../config');

// fields to minimize payload when ingesting
const fields = encodeURIComponent('name,cca3,region,subregion,capital,flags,currencies,population,languages');

const BASE = `${restBase}/v3.1`;

async function apiAll() {
  const url = `${BASE}/all?fields=${fields}`;
  const { data } = await axios.get(url, { timeout: 20000 });
  return data;
}

async function apiByCode(code) {
  const url = `${BASE}/alpha/${encodeURIComponent(code)}?fields=${fields}`;
  const { data } = await axios.get(url, { timeout: 10000 });
  return Array.isArray(data) ? data[0] : data;
}

module.exports = { apiAll, apiByCode };
