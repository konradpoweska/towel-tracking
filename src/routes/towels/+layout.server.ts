import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async (event) => {
  const session = await event.locals.getSession();

  if (!session) {
    throw redirect(307, "/auth/signin");
  }

  const userId = session.user?.id;
  if (!userId) throw new Error();

  return {
    session,
    userId,
  };
};
