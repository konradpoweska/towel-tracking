import { database } from "$lib/server/db";
import { generateUser } from "$lib/server/users/tests";
import { beforeEach, expect, it } from "vitest";
import { createHome } from "./createHome";
import { homes } from "$lib/server/home/model";

beforeEach(async () => {
  await database.dropDatabase();
});

it("should create a new home", async () => {
  const user = await generateUser();

  const _id = await createHome(user._id, "Test home");

  const home = await homes.findOne({ _id });
  expect(home).toBeDefined();
  expect(home?.members[0].equals(user._id)).toBeTruthy();
});
