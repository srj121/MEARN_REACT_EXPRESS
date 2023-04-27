const { MongoClient } = require('mongodb');
const logger = require('./logger/logger')

// MongoDB Atlas connection URI
const uri =  process.env.MONGODB_URI;

// Connect to MongoDB Atlas
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Declare a variable to hold the "first" collection
let firstCollection;

async function connectToDatabase() {
  try {
    await client.connect();
    logger.info('Connected to MongoDB Atlas');

    // Get a reference to the "first" collection
    firstCollection = client.db('expressJs').collection('first');
  } catch (err) {
  logger.error(err);
    process.exit(1);
  }
}

module.exports = {
  connectToDatabase, 
  firstCollection,
  client
};
