import { assertUserIsMember } from "$lib/server/home/service/assertUserIsMember";
import { towels } from "$lib/server/towels/model";
import { error } from "@sveltejs/kit";
import type { ObjectId } from "mongodb";

export default washTowels;

async function washTowels(
  homeId: ObjectId,
  userId: ObjectId,
  towelIds: ObjectId[],
): Promise<void> {
  await assertUserIsMember(userId, homeId);

  const res = await towels.updateMany(
    { _id: { $in: towelIds }, home: homeId },
    {
      $currentDate: { washed: true },
      $unset: { user: true, usedSince: true },
    },
  );

  if (res.modifiedCount != towelIds.length)
    throw error(400, "Not all provided towelIds could have been updated.");
}
