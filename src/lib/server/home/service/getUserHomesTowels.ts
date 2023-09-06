import type { Home, Towel } from "$lib/models";
import type { WithId } from "$lib/utils";
import type { ObjectId } from "mongodb";
import type { Id } from "../../db";
import { homes } from "../model";

export type HomeTowels<Id = ObjectId, D = Date> = WithId<Id, Home<Id>> & {
  towels: (Omit<WithId<Id, Towel<Id, D>>, "user"> & {
    user?: { _id: Id; name: string };
  })[];
};

export async function getUserHomesTowels(userId: Id): Promise<HomeTowels[]> {
  return homes
    .aggregate<HomeTowels>([
      {
        $match: {
          $expr: {
            $in: [userId, "$members"],
          },
        },
      },
      {
        $lookup: {
          from: "towels",
          localField: "_id",
          foreignField: "home",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                pipeline: [{ $project: { name: 1 } }],
                as: "user",
              },
            },
            { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
          ],
          as: "towels",
        },
      },
    ])
    .toArray();
}
