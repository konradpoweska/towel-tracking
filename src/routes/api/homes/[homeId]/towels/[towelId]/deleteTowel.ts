import type { Id } from "$lib/server/db";
import { assertUserIsMember } from "$lib/server/home/service/assertUserIsMember";
import { towels } from "$lib/server/towels/model";
import { error } from "@sveltejs/kit";

export const deleteTowel = async (
  towelId: Id,
  homeId: Id,
  userId: Id
): Promise<void> => {
  await assertUserIsMember(userId, homeId);
  const deletion = await towels.deleteOne({ _id: towelId, home: homeId });
  if (deletion.deletedCount == 0) throw error(404);
};
