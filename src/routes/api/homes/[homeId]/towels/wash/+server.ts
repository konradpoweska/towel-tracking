import { objectIdSchema } from "$lib/server/parsing";
import { error, json } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { z } from "zod";
import type { RequestHandler } from "./$types";
import washTowels from "./washTowels";

const bodySchema = z.object({
  towelIds: objectIdSchema.array(),
});

const paramsSchema = z.object({
  homeId: objectIdSchema,
});

export const POST: RequestHandler = async ({ locals, params, request }) => {
  const paramsParsing = paramsSchema.safeParse(params);
  if (!paramsParsing.success) throw error(400, paramsParsing.error.message);
  const { homeId } = paramsParsing.data;

  const bodyParsing = bodySchema.safeParse(await request.json());
  if (!bodyParsing.success) throw error(400, bodyParsing.error.message);
  const { towelIds } = bodyParsing.data;

  const userId = new ObjectId((await locals.getSession())?.user?.id);
  await washTowels(homeId, userId, towelIds);
  return json({ ok: true });
};
