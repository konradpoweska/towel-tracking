import { safeParse } from "$lib/server/parsing";
import { getUserId } from "$lib/server/utils";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getHome, type HomeWithUsers } from "./getHome";
import leaveOrDeleteHome from "./leaveOrDeleteHome";
import { paramsSchema } from "./paramsSchema";

export type Home = HomeWithUsers<string>;

export const GET: RequestHandler = async ({ locals, params }) => {
  const userId = await getUserId(locals);
  const { homeId } = safeParse(paramsSchema, params, 404);
  const home = await getHome(userId, homeId);
  if (!home) throw error(404, "Not Found");
  return json(home);
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const userId = await getUserId(locals);
  const { homeId } = safeParse(paramsSchema, params, 404);
  await leaveOrDeleteHome(userId, homeId);
  return new Response();
};
