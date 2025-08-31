// server/src/data/repo.js
const Country = require('../../models/Country');

async function repoSuggest(query = '', continent, limit = 8) {
  const filter = {};
  if (continent) filter.region = continent;
  if (query) filter['name.common'] = { $regex: query, $options: 'i' };
  return Country.find(filter)
    .select('cca3 name.common region flags.png flags.svg capital currencies')
    .limit(limit)
    .lean();
}

async function repoList({ continent, sortBy = 'name', order = 'asc', page = 1, perPage = 20, name }) {
  const filter = {};
  if (continent) filter.region = continent;
  if (name) filter['name.common'] = { $regex: name, $options: 'i' };

  let sort = { 'name.common': order === 'asc' ? 1 : -1 };
  if (sortBy === 'capital') sort = { 'capital.0': order === 'asc' ? 1 : -1 };
  if (sortBy === 'currency') sort = { 'currencies.0.name': order === 'asc' ? 1 : -1 };

  const cursor = Country.find(filter)
    .select('cca3 name.common region capital currencies flags.png flags.svg population')
    .sort(sort)
    .skip((page - 1) * perPage)
    .limit(perPage)
    .lean();

  const [items, total] = await Promise.all([cursor, Country.countDocuments(filter)]);
  return { items, total };
}

async function repoByCode(code) {
  return Country.findOne({ cca3: String(code).toUpperCase() }).lean();
}

async function repoBulkUpsert(countries) {
  if (!countries || !countries.length) return;
  const ops = countries.map((c) => ({
    updateOne: {
      filter: { cca3: c.cca3 },
      update: { $set: c },
      upsert: true
    }
  }));
  await Country.bulkWrite(ops, { ordered: false });
}

module.exports = { repoSuggest, repoList, repoByCode, repoBulkUpsert };
