import { error } from "@sveltejs/kit";
import type { ObjectId } from "mongodb";
import { homes } from "../model";

export const assertUserIsMember = async (
  userId: ObjectId,
  homeId: ObjectId
): Promise<void> => {
  const home = await homes.findOne({ _id: homeId, members: userId });
  if (!home)
    throw error(403, `Logged in user is not a member of home ${homeId}.`);
};
