import { building } from "$app/environment";
import { env } from "$env/dynamic/private";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(
  building ? "mongodb://dummy-host/" : env.MONGO_URL
);
export const clientPromise = client.connect();

export const database = client.db(env.MONGO_DB);
export type Id = ObjectId;
