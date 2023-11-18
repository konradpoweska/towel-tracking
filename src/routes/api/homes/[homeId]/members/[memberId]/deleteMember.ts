import type { Id } from "$lib/server/db";
import { homes } from "$lib/server/home/model";
import { error } from "@sveltejs/kit";

export default async (homeId: Id, userId: Id, memberIdToRemove: Id) => {
  if (memberIdToRemove.equals(userId))
    throw error(403, "Removing yourself is forbidden.");

  const update = await homes.updateOne(
    { _id: homeId, members: userId },
    { $pull: { members: memberIdToRemove } },
  );
  if (!update.modifiedCount) throw error(404);
};
