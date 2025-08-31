// server/src/routes/countryByCode.js
const express = require('express');
const router = express.Router();
const DataSource = require('../data/datasource');

router.get('/:code', async (req, res, next) => {
  try {
    const code = String(req.params.code);
    const d = await DataSource.byCode(code);
    if (!d) return res.status(404).json({ code: 'NOT_FOUND', message: 'Country not found' });
    res.json(d);
  } catch (err) { next(err); }
});

module.exports = router;
