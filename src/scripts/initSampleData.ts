import { clientPromise } from "$lib/server/db";
import { homes } from "$lib/server/home/model";
import { generateHome } from "$lib/server/home/tests";
import { towels } from "$lib/server/towels/model";
import { generateTowel } from "$lib/server/towels/tests";
import { users } from "$lib/server/users/model";
import { generateUser } from "$lib/server/users/tests";

const ONE_WEEK = 604800000;
const client = await clientPromise;

// drop collections ignoring errors
await Promise.allSettled([homes, towels].map((coll) => coll.drop()));

// init users
let [mainUser, otherUser] = await users.find().toArray();
if (!mainUser) throw new Error("No main user found in the database, please log in at least once");
otherUser ??= await generateUser()

// init homes
let sampleHomes = [
  await generateHome({ members: [mainUser._id, otherUser._id] }),
];

// init towels
for (let home of sampleHomes) {
  for (let i = 0; i <= home.members.length * 2; i++) {
    let towelUser = i % 2 == 0 ? home.members[i / 2] : undefined;

    await generateTowel({
      home: home._id,
      ...(towelUser
        ? {
            user: towelUser,
            usedSince: new Date(Date.now() - Math.random() * ONE_WEEK),
          }
        : {
            washed: new Date(Date.now() - Math.random() * 2 * ONE_WEEK),
          }),
    });
  }
}

await client.close();
