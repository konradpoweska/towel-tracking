import { assertUserIsMember } from "$lib/server/home/service/assertUserIsMember";
import { towels } from "$lib/server/towels/model";
import type { ObjectId } from "mongodb";

export async function useNewTowel(name: string, homeId: ObjectId, userId: ObjectId): Promise<void> {
  await assertUserIsMember(userId, homeId);

  await towels.insertOne(
    {
      home: homeId,
      name,
      // user: userId,
      // usedSince: new Date(),
    },
  );
}
