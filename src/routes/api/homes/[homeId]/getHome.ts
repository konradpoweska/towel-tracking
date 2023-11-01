import type { Home } from "$lib/models";
import type { Id } from "$lib/server/db";
import { homes } from "$lib/server/home/model";
import type { WithId } from "$lib/utils";
import type { ObjectId } from "mongodb";

export type HomeWithUsers<Id = ObjectId> = WithId<
  Id,
  Omit<Home<Id>, "members">
> & {
  members: { _id: Id; name: string }[];
};

export const getHome = async (
  userId: Id,
  homeId: Id
): Promise<HomeWithUsers | null> =>
  await homes
    .aggregate<HomeWithUsers>([
      { $match: { _id: homeId, members: userId } },
      {
        $lookup: {
          from: "users",
          localField: "members",
          foreignField: "_id",
          pipeline: [{ $project: { name: 1 } }],
          as: "members",
        },
      },
    ])
    .next();
