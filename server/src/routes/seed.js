// server/src/routes/seed.js
const express = require('express');
const router = express.Router();
const DataSource = require('../data/datasource');

router.post('/', async (_req, res, next) => {
  try {
    const result = await DataSource.ingestAll();
    res.json(result);
  } catch (err) { next(err); }
});

module.exports = router;
