import { error } from "@sveltejs/kit";
import { ObjectId } from "mongodb";

export const getUserId = async (
  locals: App.Locals,
): Promise<ObjectId> => {
  const session = await locals.getSession();
  const id = session?.user?.id;
  if (!id) throw error(401, "User is not logged in");
  return new ObjectId(id);
};
