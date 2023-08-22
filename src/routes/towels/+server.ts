import { getUserHomesTowels } from "$lib/server/home/service";
import { getSessionUser } from "$lib/server/users/service";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals }) => {
  const user = await getSessionUser(await locals.getSession());
  const towels = await getUserHomesTowels(user._id);
  return json(towels);
};
