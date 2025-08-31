// server/src/server.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { connectMongo } = require('./lib/mongo');
const { port } = require('./config');

const health = require('./routes/health');
const seed = require('./routes/seed');
const suggest = require('./routes/suggest');
const countries = require('./routes/countries');
const countryByCode = require('./routes/countryByCode');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '256kb' }));
app.use(morgan('dev'));

app.use('/health', health);
app.use('/api/seed', seed);
app.use('/api/suggest', suggest);
app.use('/api/countries', countries);
app.use('/api/country', countryByCode);

app.use((err, _req, res, _next) => {
  console.error(err.stack || err);
  res.status(err.status || 500).json({ code: 'ERR', message: err.message || 'Internal error' });
});

connectMongo().then(() => {
  app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
});
