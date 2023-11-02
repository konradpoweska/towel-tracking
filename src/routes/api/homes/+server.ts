import { getUserHomes } from "$lib/server/home/service/getUserHomes";
import { getUserId } from "$lib/server/utils";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals }) =>
  json(await getUserHomes(await getUserId(locals)));
