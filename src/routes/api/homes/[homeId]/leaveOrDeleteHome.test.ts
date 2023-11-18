import { database } from "$lib/server/db";
import { homes } from "$lib/server/home/model";
import { generateHome } from "$lib/server/home/tests";
import { towels } from "$lib/server/towels/model";
import { generateTowel } from "$lib/server/towels/tests";
import { generateUser } from "$lib/server/users/tests";
import { beforeEach, expect, it } from "vitest";
import leaveOrDeleteHome from "./leaveOrDeleteHome";

beforeEach(async () => {
  await database.dropDatabase();
});

it("should keep the home existing if it has other members", async () => {
  const user1 = await generateUser();
  const user2 = await generateUser();
  const home = await generateHome({ members: [user1._id, user2._id] });
  await generateTowel({ home: home._id });

  await leaveOrDeleteHome(user1._id, home._id);

  const updatedHome = await homes.findOne({ _id: home._id });
  const homeTowels = await towels.find({ home: home._id }).toArray();
  expect(updatedHome?.members.length).toBe(1);
  expect(updatedHome?.members[0].equals(user2._id)).toBeTruthy();
  expect(homeTowels.length).toEqual(1);
});

it("should delete the home and its towels if there are no members left", async () => {
  const user = await generateUser();
  const home = await generateHome({ members: [user._id] });
  await generateTowel({ home: home._id });

  await leaveOrDeleteHome(user._id, home._id);

  const updatedHome = await homes.findOne({ _id: home._id });
  const homeTowels = await towels.find({ home: home._id }).toArray();
  expect(updatedHome).toBeNull();
  expect(homeTowels.length).toEqual(0);
});
