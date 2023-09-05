import { env } from "$env/dynamic/private";
import { clientPromise } from "$lib/server/db";
import GoogleProvider from "@auth/core/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { SvelteKitAuth } from "@auth/sveltekit";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { locale } from "svelte-i18n";

const auth = SvelteKitAuth({
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise, { databaseName: env.MONGO_DB }),
  callbacks: {
    session: ({ user, session }) => {
      return { ...session, user };
    },
  },
});

export const i18n: Handle = async ({ event, resolve }) => {
  const lang = event.request.headers.get("accept-language")?.split(",")[0];
  if (lang) {
    locale.set(lang);
  }
  return resolve(event);
};

export const handle: Handle = sequence(auth, i18n);
