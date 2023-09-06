import { clientPromise } from "$lib/server/db";
import { homes } from "$lib/server/home/model";
import { towels } from "$lib/server/towels/model";
import { users } from "$lib/server/users/model";

const client = await clientPromise;

// drop collections ignoring errors
await Promise.allSettled([homes, towels].map((coll) => coll.drop()));

let user = await users.findOne();
if (user === null) throw new Error("No user in database");
let { _id: userId } = user;

let home = await homes.insertOne({
  name: "Home 1",
  members: [userId],
});

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

let towel = await towels.insertOne({
  user: userId,
  name: "Beżowy",
  usedSince: yesterday,
  home: home.insertedId,
});

await client.close();
