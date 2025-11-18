// src/lib/mongodb.ts
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || "my_app_db";

if (!uri) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri);
  globalThis._mongoClientPromise = client.connect();
}

clientPromise = globalThis._mongoClientPromise as Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}
