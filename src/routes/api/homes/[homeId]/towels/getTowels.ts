import type { Towel } from "$lib/models";
import type { Id } from "$lib/server/db";
import { assertUserIsMember } from "$lib/server/home/service/assertUserIsMember";
import { towels } from "$lib/server/towels/model";
import type { WithId } from "mongodb";

export const getTowels = async (
  userId: Id,
  homeId: Id
): Promise<WithId<Towel>[]> => {
  await assertUserIsMember(userId, homeId);
  return towels
    .find({ home: homeId }, { sort: { usedSince: -1, washed: -1 } })
    .toArray();
};
