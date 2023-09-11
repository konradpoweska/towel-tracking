import { assertUserIsMember } from "$lib/server/home/service/assertUserIsMember";
import { towels } from "$lib/server/towels/model";
import { error } from "@sveltejs/kit";
import type { ObjectId } from "mongodb";

export default useTowel;

async function useTowel(
  towelId: ObjectId,
  homeId: ObjectId,
  userId: ObjectId
): Promise<void> {
  await assertUserIsMember(userId, homeId);

  const res = await towels.updateOne(
    {
      _id: towelId,
      home: homeId,
      user: { $exists: false },
      usedSince: { $exists: false },
    },
    {
      $currentDate: { usedSince: true },
      $set: { user: userId },
    }
  );
  if (!res.modifiedCount)
    throw error(400, "Specified towel doesn't exist or is used");
}
