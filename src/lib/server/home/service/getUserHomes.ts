import type { Home } from "$lib/models";
import type { Id } from "$lib/server/db";
import type { WithId } from "mongodb";
import { homes } from "../model";

export function getUserHomes(userId: Id): Promise<WithId<Home>[]> {
  return homes.find({ members: userId }).toArray();
}
