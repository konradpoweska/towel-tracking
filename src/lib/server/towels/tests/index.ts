import type { Towel } from "$lib/models";
import type { WithId } from "mongodb";
import { generateHome } from "../../home/tests";
import { towels } from "./../model";
import { generateTowelName } from "./generateTowelName";

export async function generateTowel(
  data: Partial<Towel> = {}
): Promise<WithId<Towel>> {
  const towel: Towel = {
    home: data.home ?? (await generateHome())._id,
    ...(data.user && {
      usedSince: data.usedSince ?? new Date(),
    }),
    name: generateTowelName(),
    ...data,
  };
  const res = await towels.insertOne(towel);
  return { _id: res.insertedId, ...towel };
}
