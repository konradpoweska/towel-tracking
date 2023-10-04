import type { User } from "@auth/core/types";
import type { WithId } from "mongodb";
import { users } from "./model";
import { randomUUID } from "node:crypto";

export async function generateUser(
  data: Partial<User> = {}
): Promise<WithId<User>> {
  const user = {
    id: `test_${randomUUID()}`,
    email: "test@towel-tracking.com",
    name: "John Doe",
    ...data,
  };
  const res = await users.insertOne(user);
  return { _id: res.insertedId, ...user };
}
