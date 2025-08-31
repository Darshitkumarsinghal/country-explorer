// server/src/data/datasource.js
const { apiAll, apiByCode } = require('./restCountriesClient');
const { repoSuggest, repoList, repoByCode, repoBulkUpsert } = require('./repo');
const { dataSource } = require('../config');

module.exports = {
  // suggestion endpoint must come from DB per requirement
  async suggest(q, region) {
    return repoSuggest(q, region);
  },

  async list(params) {
    if (dataSource === 'DB') return repoList(params);
    // fallback - fetch from REST API (not recommended for production listing)
    const all = await apiAll();
    const mapped = all.map((r) => ({
      cca3: r.cca3,
      name: { common: r.name?.common, official: r.name?.official },
      region: r.region,
      subregion: r.subregion,
      capital: r.capital || [],
      flags: { svg: r.flags?.svg, png: r.flags?.png, alt: r.flags?.alt },
      currencies: r.currencies ? Object.entries(r.currencies).map(([code, v]) => ({ code, name: v?.name, symbol: v?.symbol })) : [],
      population: r.population,
      languages: r.languages ? Object.values(r.languages) : []
    }));
    // naive paging
    const page = params.page || 1;
    const perPage = params.perPage || 20;
    const items = mapped.slice((page - 1) * perPage, page * perPage);
    return { items, total: mapped.length };
  },

  async byCode(code) {
    if (dataSource === 'DB') return repoByCode(code);
    return apiByCode(code);
  },

  async ingestAll() {
    const raw = await apiAll();
    const mapped = raw.map((r) => ({
      cca3: r.cca3,
      name: { common: r.name?.common, official: r.name?.official },
      region: r.region,
      subregion: r.subregion,
      capital: r.capital || [],
      flags: { svg: r.flags?.svg, png: r.flags?.png, alt: r.flags?.alt },
      currencies: r.currencies ? Object.entries(r.currencies).map(([code, v]) => ({ code, name: v?.name, symbol: v?.symbol })) : [],
      population: r.population,
      languages: r.languages ? Object.values(r.languages) : []
    }));
    await repoBulkUpsert(mapped);
    return { inserted: mapped.length };
  }
};
