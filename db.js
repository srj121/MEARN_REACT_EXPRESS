const { MongoClient } = require('mongodb');
const logger = require('./logger/logger')

const useruri =  process.env.MONGODB_URI_USER;

const userclient = new MongoClient(useruri, { useNewUrlParser: true, useUnifiedTopology: true });

let firstCollection;

async function connectToDatabaseUser() {
  try {
    await userclient.connect();
    logger.info('Connected to MongoDB Atlas');

    firstCollection = userclient.db('expressJs').collection('first');
    
  } catch (err) {
  logger.error(err);
    process.exit(1);
  }
}
//________________________________________AUTH_________________________________________

const authuri =  process.env.MONGODB_URI_SECURITY;

const authclient = new MongoClient(authuri, { useNewUrlParser: true, useUnifiedTopology: true });

let authCollection;

async function connectToDatabaseAuth() {
  try {
    await userclient.connect();
    logger.info('Connected to MongoDB Atlas');

    authCollection = authclient.db('security').collection('auth');
    
  } catch (err) {
  logger.error(err);
    process.exit(1);
  }
}

module.exports = {

connectToDatabaseUser,
firstCollection,
userclient,

  connectToDatabaseAuth , 
  authCollection,
  authclient
};
