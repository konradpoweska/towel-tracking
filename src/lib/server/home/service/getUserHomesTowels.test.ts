import { database } from "$lib/server/db";
import { generateHome } from "$lib/server/home/tests";
import { generateTowel } from "$lib/server/towels/tests";
import { generateUser } from "$lib/server/users/tests";
import { beforeEach, describe, expect, it } from "vitest";
import { getUserHomesTowels, type HomeTowels } from "./getUserHomesTowels";
import { DateTime } from "luxon";

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
        towels: [{ ...towel, user: { _id: user._id, name: user.name ?? "" } }],
      },
    ] satisfies HomeTowels[]);
  });

  it("should filter homes by user", async () => {
    const user = await generateUser();
    const home1 = await generateHome({ members: [user._id] });
    const home2 = await generateHome();

    const result = await getUserHomesTowels(user._id);

    expect(result).toMatchObject([home1]);
  });
  it("should sort towels, newest first", async () => {
    const dates = [
      DateTime.now(),
      DateTime.now().minus({ day: 4 }),
      DateTime.now().minus({ hour: 1 }),
    ];
    const correctOrderIndexes = [0, 2, 1];

    const user = await generateUser();
    const home = await generateHome({ members: [user._id] });
    await Promise.all(
      dates.map((date) =>
        generateTowel({
          home: home._id,
          user: user._id,
          usedSince: date.toJSDate(),
        }),
      ),
    );

    const result = await getUserHomesTowels(user._id);

    expect(result).toMatchObject([
      {
        towels: correctOrderIndexes.map((index) => ({
          usedSince: dates[index].toJSDate(),
        })),
      },
    ]);
  });
});
