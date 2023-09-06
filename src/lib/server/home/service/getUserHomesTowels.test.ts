import { database } from "$lib/server/db";
import { generateHome } from "$lib/server/home/tests";
import { generateTowel } from "$lib/server/towels/tests";
import { generateUser } from "$lib/server/users/tests";
import { beforeEach, describe, expect, it } from "vitest";
import { getUserHomesTowels, type HomeTowels } from "./getUserHomesTowels";

describe("getUserHomesTowels", () => {
  beforeEach(async () => {
    await database.dropDatabase();
  });

  it("basic case", async () => {
    const user = await generateUser();
    const home = await generateHome({ members: [user._id] });
    const towel = await generateTowel({ home: home._id, user: user._id });

    const result = await getUserHomesTowels(user._id);

    expect(result).toMatchObject([
      {
        ...home,
        towels: [
          { ...towel, user: { _id: user._id, name: user.name ?? "" } },
        ],
      },
    ] satisfies HomeTowels[]);
  });

  it('should filter homes by user', async () => {
    const user = await generateUser();
    const home1 = await generateHome({ members: [user._id] });
    const home2 = await generateHome();

    const result = await getUserHomesTowels(user._id);

    expect(result).toMatchObject([home1]);
  })
});
