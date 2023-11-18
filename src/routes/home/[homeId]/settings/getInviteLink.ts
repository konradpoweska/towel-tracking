import type { Id } from "$lib/server/db";
import { assertUserIsMember } from "$lib/server/home/service/assertUserIsMember";
import { signObjectId } from "$lib/server/home/service/invite-link/signObjectId";
import type { ObjectId } from "mongodb";

export const getInviteLink = async ({
  userId,
  homeId,
  origin,
}: {
  userId: Id;
  homeId: ObjectId;
  origin: string;
}): Promise<string> => {
  await assertUserIsMember(userId, homeId);

  const signature = await signObjectId(homeId);

  return `${origin}/home/${homeId}/join/${signature}`;
};
