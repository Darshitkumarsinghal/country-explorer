// server/src/routes/suggest.js
const express = require('express');
const router = express.Router();
const DataSource = require('../data/datasource');
const { fuzzyOk } = require('../lib/levenshtein');

router.get('/', async (req, res, next) => {
  try {
    const q = String(req.query.q || '').trim();
    const region = req.query.region ? String(req.query.region) : undefined;
    const docs = await DataSource.suggest(q, region);

    let items = docs;
    if (q) {
      // lightweight fuzzy re-rank: exact/close matches first
      items = docs
        .map((d) => ({ d, score: fuzzyOk(d.name.common, q) ? 0 : 1 }))
        .sort((a, b) => a.score - b.score)
        .map(x => x.d);
    }
    res.json(items);
  } catch (err) { next(err); }
});

module.exports = router;
