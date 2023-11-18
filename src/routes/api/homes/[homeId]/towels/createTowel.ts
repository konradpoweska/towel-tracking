import { assertUserIsMember } from "$lib/server/home/service/assertUserIsMember";
import { towels } from "$lib/server/towels/model";
import type { ObjectId } from "mongodb";

export async function createTowel(
  name: string,
  homeId: ObjectId,
  userId: ObjectId,
  use: boolean = false,
): Promise<ObjectId> {
  await assertUserIsMember(userId, homeId);

  const insertion = await towels.insertOne({
    home: homeId,
    name,
    ...(use && {
      user: userId,
      usedSince: new Date(),
    }),
  });

  return insertion.insertedId;
}
