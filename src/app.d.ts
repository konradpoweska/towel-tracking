// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

import type { AdapterUser } from "@auth/core/adapters";

declare module "@auth/core/types" {
  interface Session {
    user: AdapterUser;
  }
}

declare module "@auth/sveltekit/node_modules/@auth/core/types" {
  interface Session {
    user: AdapterUser;
  }
}

export {};
