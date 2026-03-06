const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not set');
}

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

async function getCollection(collectionName) {
  const client = await connectToDatabase();
  const db = client.db('mosspilot');
  return db.collection(collectionName);
}

module.exports = { connectToDatabase, getCollection };
