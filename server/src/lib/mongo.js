// server/src/lib/mongo.js
const mongoose = require('mongoose');
const { mongoUri } = require('../config');

async function connectMongo() {
  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('Mongo connected');
  } catch (err) {
    console.error('Mongo connection error', err);
    process.exit(1);
  }
}

module.exports = { connectMongo, mongoose };
