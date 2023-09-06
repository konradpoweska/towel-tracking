import { getUserHomesTowels } from "$lib/server/home/service/getUserHomesTowels";
import { error, json } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals }) => {
  const session = await locals.getSession();
  if (!session?.user?.id) throw error(400);
  const userId = new ObjectId(session.user.id);
  const towels = await getUserHomesTowels(userId);
  return json(towels);
};
