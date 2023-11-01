import { database } from "$lib/server/db";
import { beforeEach, describe, expect, it } from "vitest";
import { generateHome } from "../tests";
import { generateUser } from "$lib/server/users/tests";
import { getUserHomes } from "./getUserHomes";

describe("getUserHomes", () => {
  beforeEach(async () => {
    await database.dropDatabase();
  });
  it("should return only homes the user is member of", async () => {
    const user = await generateUser();
    const home1 = await generateHome();
    const home2 = await generateHome({ members: [user._id] });

    const userHomes = await getUserHomes(user._id);

    expect(userHomes.some((home) => home._id.equals(home1._id))).toBeFalsy();
    expect(userHomes.some((home) => home._id.equals(home2._id))).toBeTruthy();
  });
});
