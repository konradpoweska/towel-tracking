import { objectIdSchema, safeParse } from "$lib/server/parsing";
import { getUserId } from "$lib/server/utils";
import { json } from "@sveltejs/kit";
import { paramsSchema as paramsSchemaBase } from "../../../paramsSchema";
import type { RequestHandler } from "./$types";
import useTowel from "./useTowel";

const paramsSchema = paramsSchemaBase.extend({
  towelId: objectIdSchema,
});

export const POST: RequestHandler = async ({ params, locals }) => {
  const { towelId, homeId } = safeParse(paramsSchema, params, 404);

  const userId = await getUserId(locals);
  await useTowel(towelId, homeId, userId);
  return json({ ok: true });
};
