import { database } from "$lib/server/db";
import { generateHome } from "$lib/server/home/tests";
import { towels } from "$lib/server/towels/model";
import { generateUser } from "$lib/server/users/tests";
import { beforeEach, describe, expect, it } from "vitest";
import { useNewTowel } from "./useNewTowel";

describe("useNewTowel", () => {
  beforeEach(async () => {
    await database.dropDatabase();
  });

  it("should add a towel", async () => {
    const user = await generateUser();
    const home = await generateHome({ members: [user._id] });
    const name = "Red";

    const towelId = await useNewTowel(name, home._id, user._id);

    expect(towels.findOne(towelId)).resolves.toMatchObject({
      name,
      user: user._id,
    });
  });

  it("should not allow washing towels of a home the user is not member of", async () => {
    const user = await generateUser();
    const otherUser = await generateUser();
    const home = await generateHome({ members: [otherUser._id] });

    const call = () => useNewTowel("Red", home._id, user._id);

    expect(call).rejects.toThrow();
  });
});
