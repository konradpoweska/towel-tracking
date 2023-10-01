import { objectIdSchema } from "$lib/server/parsing";
import { error, json } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { z } from "zod";
import type { RequestHandler } from "./$types";
import { useNewTowel } from "./useNewTowel";

const paramsSchema = z.object({
  homeId: objectIdSchema,
});

const bodySchema = z.object({
  name: z.string(),
});

export const POST: RequestHandler = async ({ locals, params, request }) => {
  const paramsParsing = paramsSchema.safeParse(params);
  if (!paramsParsing.success) throw error(400, paramsParsing.error.message);
  const { homeId } = paramsParsing.data;

  const bodyParsing = bodySchema.safeParse(await request.json());
  if (!bodyParsing.success) throw error(400, bodyParsing.error.message);
  const { name } = bodyParsing.data;

  const userId = new ObjectId((await locals.getSession())?.user?.id);
  await useNewTowel(name, homeId, userId);
  return json({ ok: true });
};
