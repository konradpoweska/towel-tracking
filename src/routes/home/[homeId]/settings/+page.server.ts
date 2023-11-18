import { safeParse } from "$lib/server/parsing";
import { getUserId } from "$lib/server/utils";
import type { ServerLoad } from "@sveltejs/kit";
import { paramsSchema } from "../paramsSchema";
import { getInviteLink } from "./getInviteLink";

export const load: ServerLoad = async ({ request, params, locals }) => {
  const { homeId } = safeParse(paramsSchema, params, 404);

  const origin = new URL(request.url).origin;
  const userId = await getUserId(locals);
  return {
    inviteLink: await getInviteLink({ homeId, userId, origin }),
  };
};
