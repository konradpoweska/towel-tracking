import { database } from "$lib/server/db";
import { homes } from "$lib/server/home/model";
import { signObjectId } from "$lib/server/home/service/invite-link/signObjectId";
import { generateHome } from "$lib/server/home/tests";
import { generateUser } from "$lib/server/users/tests";
import { beforeEach, describe, expect, it } from "vitest";
import { joinHome } from "./joinHome";

describe("joinHome", () => {
  beforeEach(async () => {
    await database.dropDatabase();
  });
  it("should join", async () => {
    const user = await generateUser();
    const home = await generateHome();

    await joinHome(home._id, await signObjectId(home._id), user._id);

    const updatedHome = await homes.findOne();
    expect(updatedHome?.members[0].equals(user._id)).toBeTruthy();
  });

  it("should not join if user is already member", async () => {
    const user = await generateUser();
    const home = await generateHome({ members: [user._id] });

    await joinHome(home._id, await signObjectId(home._id), user._id);

    const updatedHome = await homes.findOne();
    expect(updatedHome?.members.length).toBe(1);
  });
});
