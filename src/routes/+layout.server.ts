import type { Home } from "$lib/models";
import { request } from "$lib/request";
import type { WithId } from "$lib/utils";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

type Homes = WithId<string, Home<string>>[];

export const load: LayoutServerLoad = async ({ fetch, locals, depends }) => {
  const session = await locals.getSession();

  if (!session?.user) {
    throw redirect(307, "/auth/signin");
  }

  depends("homes");
  const homes = await request<Homes>(fetch, "/api/homes");

  return { session, homes };
};
