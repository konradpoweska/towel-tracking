import type { WithId } from "mongodb";
import type { Towel } from "./model";
import { database } from "../db";

export function getTowels(): Promise<WithId<Towel>[]> {
  const coll = database.collection<Towel>("towels");
  return coll.find().toArray();
}
