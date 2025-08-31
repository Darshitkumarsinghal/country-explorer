// server/src/models/Country.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const CurrencySchema = new Schema({
  code: String,
  name: String,
  symbol: String
}, { _id: false });

const CountrySchema = new Schema({
  cca3: { type: String, index: true, unique: true },
  name: {
    common: { type: String, index: true },
    official: String
  },
  region: { type: String, index: true },
  subregion: String,
  capital: { type: [String], default: [] },
  flags: {
    svg: String,
    png: String,
    alt: String
  },
  currencies: { type: [CurrencySchema], default: [] },
  population: Number,
  languages: { type: [String], default: [] }
}, { timestamps: true });

CountrySchema.index({ 'name.common': 1, region: 1 });
CountrySchema.index({ 'capital': 1 });
CountrySchema.index({ 'currencies.name': 1 });

module.exports = mongoose.model('Country', CountrySchema);
