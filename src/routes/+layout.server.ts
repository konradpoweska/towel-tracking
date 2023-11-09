import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  const session = await locals.getSession();

  if (!session?.user) {
    throw redirect(307, "/auth/signin");
  }

  return { session };
};
