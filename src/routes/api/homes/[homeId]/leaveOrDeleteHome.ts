import type { Id } from "$lib/server/db";
import { homes } from "$lib/server/home/model";
import { towels } from "$lib/server/towels/model";
import { error } from "@sveltejs/kit";

export default async (userId: Id, homeId: Id): Promise<void> => {
  const update = await homes.findOneAndUpdate(
    { _id: homeId, members: userId },
    { $pull: { members: userId } },
    { returnDocument: "after" }
  );

  if (!update.ok) throw error(404);

  if (update.value?.members.length === 0) deleteHome(homeId);
};

const deleteHome = (homeId: Id) =>
  Promise.all([
    homes.deleteOne({ _id: homeId }),
    towels.deleteMany({ home: homeId }),
  ]);
