import type { Id } from "$lib/server/db";
import { homes } from "$lib/server/home/model";

export const createHome = async (userId: Id, name: string): Promise<Id> => {
  const res = await homes.insertOne({ name, members: [userId] });
  return res.insertedId;
};
