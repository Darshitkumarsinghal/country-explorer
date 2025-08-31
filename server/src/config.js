require('dotenv').config();
module.exports = {
  port: parseInt(process.env.PORT || '4000', 10),
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/country_explorer',
  dataSource: (process.env.DATA_SOURCE || 'DB').toUpperCase(),
  restBase: process.env.RESTCOUNTRIES_BASE || 'https://restcountries.com'
};