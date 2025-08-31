// server/src/routes/countries.js
const express = require('express');
const router = express.Router();
const DataSource = require('../data/datasource');

router.get('/', async (req, res, next) => {
  try {
    const {
      region,
      sortBy = 'name',
      order = 'asc',
      page = '1',
      perPage = '20',
      name
    } = req.query;

    const r = await DataSource.list({
      continent: region,
      sortBy,
      order,
      page: parseInt(page, 10),
      perPage: Math.min(parseInt(perPage, 10) || 20, 100),
      name
    });
    res.json(r);
  } catch (err) { next(err); }
});

module.exports = router;
