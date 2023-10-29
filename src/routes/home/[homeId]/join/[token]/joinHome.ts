import type { Id } from "$lib/server/db";
import { homes } from "$lib/server/home/model";
import { verifyObjectIdSignature } from "$lib/server/home/service/invite-link/signObjectId";
import { error } from "@sveltejs/kit";
import type { ObjectId } from "mongodb";

export const joinHome = async (
  homeId: ObjectId,
  signature: string,
  userId: Id,
): Promise<void> => {
  const valid = await verifyObjectIdSignature(signature, homeId);

  if (!valid) throw error(404);

  await homes.updateOne(
    { _id: homeId, members: { $ne: userId } },
    { $push: { members: userId } },
  );
};
