const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'OverwatchStatsBot';
const collectionName = 'users';

const getMongoClient = () => new mongoClient(url, {useNewUrlParser: true});

module.exports = {
  getMongoClient: getMongoClient,
  dbName: dbName,
  collectionName: collectionName
}