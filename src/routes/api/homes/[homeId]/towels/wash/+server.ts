import { objectIdSchema, safeParse } from "$lib/server/parsing";
import { getUserId } from "$lib/server/utils";
import { z } from "zod";
import { paramsSchema } from "../../paramsSchema";
import type { RequestHandler } from "./$types";
import washTowels from "./washTowels";

const bodySchema = z.object({
  towelIds: objectIdSchema.array(),
});

export const POST: RequestHandler = async ({ locals, params, request }) => {
  const { homeId } = safeParse(paramsSchema, params, 404);
  const { towelIds } = safeParse(bodySchema, await request.json(), 400);

  const userId = await getUserId(locals);
  await washTowels(homeId, userId, towelIds);
  return new Response();
};
