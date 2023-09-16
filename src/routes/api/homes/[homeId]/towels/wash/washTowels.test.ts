import type { Towel } from "$lib/models";
import { database } from "$lib/server/db";
import { generateHome } from "$lib/server/home/tests";
import { towels } from "$lib/server/towels/model";
import { generateTowel } from "$lib/server/towels/tests";
import { generateUser } from "$lib/server/users/tests";
import { beforeEach, describe, expect, it } from "vitest";
import washTowels from "./washTowels";

describe("washTowels", () => {
  beforeEach(async () => {
    await database.dropDatabase();
  });

  it("should unmark towels from being used", async () => {
    const user = await generateUser();
    const home = await generateHome({ members: [user._id] });
    const towelIds = [
      await generateTowel({ home: home._id, user: user._id }),
      await generateTowel({ home: home._id, user: user._id }),
    ].map((t) => t._id);

    await washTowels(home._id, user._id, towelIds);

    const checkUpdatedTowel = (towel: Towel) => {
      expect(towel?.user).toBeUndefined();
      expect(towel?.usedSince).toBeUndefined();
    };
    (await towels.find({ _id: { $in: towelIds } }).toArray()).map(
      checkUpdatedTowel
    );
  });

  it("should not allow washing towels of a home the user is not member of", async () => {
    const user = await generateUser();
    const otherUser = await generateUser();
    const home = await generateHome({ members: [otherUser._id] });
    const towel = await generateTowel({ home: home._id });

    const call = () => washTowels(home._id, user._id, [towel._id]);

    expect(call).rejects.toThrow();
  });

  it("should throw if not all provided ids could be washed", async () => {
    const user = await generateUser();
    const home = await generateHome({ members: [user._id] });
    const towel = await generateTowel({ home: home._id });
    const otherTowel = await generateTowel();

    expect(washTowels(home._id, user._id, [towel._id])).resolves.not.toThrow();

    // otherTowel cannot be washed because it belongs to another home the user is not member of
    expect(
      washTowels(home._id, user._id, [towel._id, otherTowel._id])
    ).rejects.toThrow();
  });
});
