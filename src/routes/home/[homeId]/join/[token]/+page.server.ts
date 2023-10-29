import { safeParse } from "$lib/server/parsing";
import { getUserId } from "$lib/server/utils";
import { redirect, type ServerLoad } from "@sveltejs/kit";
import { z } from "zod";
import { paramsSchema as paramsSchemaBase } from "../../paramsSchema";
import { joinHome } from "./joinHome";

const paramsSchema = paramsSchemaBase.extend({
  token: z.string(),
});

export const load: ServerLoad = async ({ locals, params }) => {
  const { homeId, token } = safeParse(paramsSchema, params, 404);

  const userId = await getUserId(locals);
  await joinHome(homeId, token, userId);
  throw redirect(303, `/home/${homeId}`);
};
