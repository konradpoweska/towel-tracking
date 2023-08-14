import { MongoClient } from "mongodb";
import { env } from "$env/dynamic/private";

const client = new MongoClient(env.MONGO_URL);
export const database = client.db("towel-monitoring");
