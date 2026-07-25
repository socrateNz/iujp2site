const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://snzogning0:jP1re3ddYDQGU370@uijp2.nhbbzuw.mongodb.net/UIJP?retryWrites=true&w=majority&appName=uijp2";

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const services = await db.collection('services').find({}).toArray();
    console.log("Services:", services);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
