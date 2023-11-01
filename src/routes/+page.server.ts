import { getUserHomes } from "$lib/server/home/service/getUserHomes";
import { redirect, type ServerLoad } from "@sveltejs/kit";
import { ObjectId } from "mongodb";

export const load: ServerLoad = async ({ locals }) => {
  const session = await locals.getSession();
  const userId = new ObjectId(session?.user?.id);
  const userHomes = await getUserHomes(userId);

  if (userHomes.length) throw redirect(302, `/home/${userHomes[0]._id}/`);
  return {};
};
