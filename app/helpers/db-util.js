import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb://sepehrtvk:Sepehrtavakoli80@ac-th29g2x-shard-00-00.nwkuq31.mongodb.net:27017,ac-th29g2x-shard-00-01.nwkuq31.mongodb.net:27017,ac-th29g2x-shard-00-02.nwkuq31.mongodb.net:27017/?ssl=true&replicaSet=atlas-k39dde-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}
export async function updateDocument(client, collection, order_id) {
  const db = client.db();

  const result = await db.collection(collection).updateOne(
    { order_id },
    {
      $set: {
        status: 1,
      },
    }
  );

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
export async function getAllDocumentsAggregate(client, collection) {
  const db = client.db();

  const pipeline = [
    {
      $match: {
        status: 1,
      },
    },
    {
      $group: {
        _id: "$cafeName",
        totalAmount: {
          $sum: "$amount",
        },
      },
    },
  ];

  const coll = await db.collection(collection);

  const cursor = coll.aggregate(pipeline);
  const result = await cursor.toArray();

  return result;
}

export async function getAllCafeTips(client, collection, sort, cafeName) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find({ cafeName: cafeName })
    .sort(sort)
    .toArray();

  return documents;
}
