import { getUserHomes } from "$lib/server/home/service/getUserHomes";
import { getUserId, LAST_VIEWED_HOME_COOKIE } from "$lib/server/utils";
import { redirect, type ServerLoad } from "@sveltejs/kit";
import type { ObjectId } from "mongodb";

export const load: ServerLoad = async ({ cookies, locals }) => {
  const lastUsedHomeId = cookies.get(LAST_VIEWED_HOME_COOKIE);
  const homes = await getUserHomes(await getUserId(locals));

  if (
    lastUsedHomeId &&
    homes.some((home) => home._id.toString() === lastUsedHomeId)
  )
    redirectToHome(lastUsedHomeId);

  if (homes.length) redirectToHome(homes[0]._id);

  return {};
};

const redirectToHome = (homeId: string | ObjectId) => {
  throw redirect(302, `/home/${homeId}/`);
};
