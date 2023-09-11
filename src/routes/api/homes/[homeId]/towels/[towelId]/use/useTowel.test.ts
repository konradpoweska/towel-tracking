import { database } from "$lib/server/db";
import { generateHome } from "$lib/server/home/tests";
import { towels } from "$lib/server/towels/model";
import { generateTowel } from "$lib/server/towels/tests";
import { generateUser } from "$lib/server/users/tests";
import { beforeEach, describe, expect, it } from "vitest";
import useTowel from "./useTowel";

describe("useTowel", () => {
  beforeEach(async () => {
    await database.dropDatabase();
  });

  it("should mark towel an unused towel as used", async () => {
    const user = await generateUser();
    const home = await generateHome({ members: [user._id] });
    const towel = await generateTowel({ home: home._id });
    let time = Date.now();

    await useTowel(towel._id, home._id, user._id);

    const updatedTowel = await towels.findOne({ _id: towel._id });
    expect(updatedTowel?.user).toEqual(user._id);
    expect(updatedTowel?.usedSince?.getTime()).toBeGreaterThanOrEqual(time);
  });

  it("should not allow using a towel of a home the user is not member of", async () => {
    const user = await generateUser();
    const otherUser = await generateUser();
    const home = await generateHome({ members: [otherUser._id] });
    const towel = await generateTowel({ home: home._id });

    const call = () => useTowel(towel._id, home._id, user._id);

    expect(call).rejects.toThrow();
  });

  it("should not allow using a towel already used", async () => {
    const user = await generateUser();
    const otherUser = await generateUser();
    const home = await generateHome({ members: [user._id, otherUser._id] });
    const towel = await generateTowel({ home: home._id, user: otherUser._id });

    const call = () => useTowel(towel._id, home._id, user._id);

    expect(call).rejects.toThrow();
  });
});
