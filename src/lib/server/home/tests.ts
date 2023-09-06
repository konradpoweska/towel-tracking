import type { Home } from "$lib/models";
import type { WithId } from "mongodb";
import { homes } from "./model";

let i = 1;

export async function generateHome(
  data: Partial<Home> = {}
): Promise<WithId<Home>> {
  const home: Home = {
    name: `Home ${i++}`,
    members: [],
    ...data,
  };
  const res = await homes.insertOne(home);
  return { _id: res.insertedId, ...home };
}
