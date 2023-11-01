import { safeParse } from "$lib/server/parsing";
import { getUserId } from "$lib/server/utils";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getHome } from "./getHome";
import { paramsSchema } from "./paramsSchema";

export const GET: RequestHandler = async ({ locals, params }) => {
  const userId = await getUserId(locals);
  const { homeId } = safeParse(paramsSchema, params, 404);
  const home = await getHome(userId, homeId);
  if (!home) throw error(404, "Not Found");
  return json(home);
};
