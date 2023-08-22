import type { Home, Towel } from "$lib/models";
import type { WithId } from "$lib/utils";
import type { Id } from "../db";
import { homes } from "./model";

export type HomeTowels<Id> = Omit<WithId<Id, Home<Id>>, "towels"> & {
  towels: (Omit<WithId<Id, Towel<Id>>, "usedBy"> & {
    usedBy: { _id: Id; name: string };
  })[];
};

export async function getUserHomesTowels(
  userId: Id
): Promise<HomeTowels<Id>[]> {
  return homes
    .aggregate<HomeTowels<Id>>([
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
                localField: "usedBy",
                foreignField: "_id",
                pipeline: [{ $project: { name: 1 } }],
                as: "usedBy",
              },
            },
            { $unwind: "$usedBy" },
          ],
          as: "towels",
        },
      },
      { $project: { name: 1, towels: 1 } },
    ])
    .toArray();
}
