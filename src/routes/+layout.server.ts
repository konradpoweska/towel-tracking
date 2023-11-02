import type { Home } from "$lib/models";
import { handleResponse, type WithId } from "$lib/utils";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ fetch, locals }) => {
  const session = await locals.getSession();

  if (!session?.user) {
    throw redirect(307, "/auth/signin");
  }

  const homes = fetch("/api/homes").then(
    handleResponse<WithId<string, Home<string>>[]>,
  );

  return { session, homes };
};
