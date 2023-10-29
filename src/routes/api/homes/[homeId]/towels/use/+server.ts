import { safeParse } from "$lib/server/parsing";
import { getUserId } from "$lib/server/utils";
import { json } from "@sveltejs/kit";
import { z } from "zod";
import { paramsSchema } from "../../paramsSchema";
import type { RequestHandler } from "./$types";
import { useNewTowel } from "./useNewTowel";

const bodySchema = z.object({
  name: z.string(),
});

export const POST: RequestHandler = async ({ locals, params, request }) => {
  const { homeId } = safeParse(paramsSchema, params, 404);
  const { name } = safeParse(bodySchema, await request.json(), 400);

  const userId = await getUserId(locals);
  await useNewTowel(name, homeId, userId);
  return json({ ok: true });
};
