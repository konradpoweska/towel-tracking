import { safeParse } from "$lib/server/parsing";
import { getUserId } from "$lib/server/utils";
import paramsSchema from "../paramsSchema";
import type { RequestHandler } from "./$types";
import useTowel from "./useTowel";

export const POST: RequestHandler = async ({ params, locals }) => {
  const { towelId, homeId } = safeParse(paramsSchema, params, 404);

  const userId = await getUserId(locals);
  await useTowel(towelId, homeId, userId);
  return new Response();
};
