import { env } from "$env/dynamic/private";
import { clientPromise } from "$lib/server/db";
import GoogleProvider from "@auth/core/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { SvelteKitAuth } from "@auth/sveltekit";

export const handle = SvelteKitAuth({
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise, { databaseName: env.MONGO_DB }),
});
