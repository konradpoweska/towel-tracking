import type { Session } from "@auth/core/types";
import { users } from "./model";

export async function getSessionUser(session: Session | null) {
  if (!session?.user?.email) throw new Error("Session error: email undefined.");
  const user = await users.findOne({ email: session?.user?.email });
  if (!user) throw new Error("User doesn't exist");
  return user;
}
