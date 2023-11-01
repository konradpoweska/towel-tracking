import { safeParse } from "$lib/server/parsing";
import { getUserId } from "$lib/server/utils";
import { json } from "@sveltejs/kit";
import { paramsSchema } from "../paramsSchema";
import type { RequestHandler } from "./$types";
import { getTowels } from "./getTowels";
import type { WithId } from "$lib/utils";
import type { Towel as BaseTowel } from "$lib/models";

export type Towel = WithId<string, BaseTowel<string, string>>;

export const GET: RequestHandler = async ({ locals, params }) => {
  const userId = await getUserId(locals);
  const { homeId } = safeParse(paramsSchema, params, 404);
  const towels = await getTowels(userId, homeId);
  return json(towels);
};
