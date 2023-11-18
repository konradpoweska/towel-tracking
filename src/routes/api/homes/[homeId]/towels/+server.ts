import { safeParse } from "$lib/server/parsing";
import { getUserId } from "$lib/server/utils";
import { json } from "@sveltejs/kit";
import { z } from "zod";
import { paramsSchema } from "../paramsSchema";
import type { RequestHandler } from "./$types";
import { createTowel } from "./createTowel";
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

const towelSchema = z.object({
  name: z.string(),
  use: z.boolean().default(false),
});

export const POST: RequestHandler = async ({ locals, params, request }) => {
  const { homeId } = safeParse(paramsSchema, params, 404);
  const { name, use } = safeParse(towelSchema, await request.json(), 400);
  const userId = await getUserId(locals);
  createTowel(name, homeId, userId, use);

  return new Response();
};
