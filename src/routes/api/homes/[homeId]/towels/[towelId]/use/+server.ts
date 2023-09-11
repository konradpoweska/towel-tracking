import { objectIdSchema } from "$lib/server/parsing";
import { error, json } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { z } from "zod";
import type { RequestHandler } from "./$types";
import useTowel from "./useTowel";

const paramsSchema = z.object({
  towelId: objectIdSchema,
  homeId: objectIdSchema,
});

export const POST: RequestHandler = async ({ params, locals }) => {
  const paramsParsing = paramsSchema.safeParse(params);
  if (!paramsParsing.success) throw error(400, paramsParsing.error.message);
  const { towelId, homeId } = paramsParsing.data;

  const userId = new ObjectId((await locals.getSession())?.user?.id);
  await useTowel(towelId, homeId, userId);
  return json({ ok: true });
};
