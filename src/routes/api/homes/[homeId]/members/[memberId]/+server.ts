import { safeParse } from "$lib/server/parsing";
import { getUserId } from "$lib/server/utils";
import type { RequestHandler } from "./$types";
import deleteMember from "./deleteMember";
import paramsSchema from "./paramsSchema";

export const DELETE: RequestHandler = async ({ locals, params }) => {
  const { homeId, memberId } = safeParse(paramsSchema, params, 404);
  await deleteMember(homeId, await getUserId(locals), memberId);
  return new Response();
};
