import { building } from "$app/environment";
import { env } from "$env/dynamic/private";
import { MongoClient, ObjectId } from "mongodb";

const getMongoUrl = (): string => {
  if (building) return "mongodb://dummy-host/";
  if (!env.MONGO_URL) throw new Error("MONGO_URL not defined");
  return env.MONGO_URL;
};

const client = new MongoClient(getMongoUrl());
export const clientPromise = client.connect();

export const database = client.db(env.MONGO_DB);
export type Id = ObjectId;
