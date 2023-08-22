import { MongoClient, ObjectId } from "mongodb";
import { env } from "$env/dynamic/private";

if (!env.MONGO_URL) {
  throw new Error('Missing environment variable: "MONGO_URL"');
}

const client = new MongoClient(env.MONGO_URL);

export const database = client.db(env.MONGO_DB);
export const clientPromise = client.connect();
export type Id = ObjectId;
