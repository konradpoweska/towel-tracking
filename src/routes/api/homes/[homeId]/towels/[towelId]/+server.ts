import { safeParse } from "$lib/server/parsing";
import { getUserId } from "$lib/server/utils";
import type { RequestHandler } from "./$types";
import { deleteTowel } from "./deleteTowel";
import paramsSchema from "./paramsSchema";

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const userId = await getUserId(locals);
  const { homeId, towelId } = safeParse(paramsSchema, params, 404);
  await deleteTowel(towelId, homeId, userId);
  return new Response();
};
