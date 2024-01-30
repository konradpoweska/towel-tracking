import type { WithId } from "mongodb";
import { users } from "./model";
import type { User } from "$lib/models/user";

export async function generateUser(
  data: Partial<User> = {},
): Promise<WithId<User>> {
  const user = {
    email: "test@towel-tracking.com",
    name: "John Doe",
    ...data,
  };
  const res = await users.insertOne(user);
  return { _id: res.insertedId, ...user };
}
