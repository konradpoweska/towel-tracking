import type { HomeTowels } from "$lib/server/home/service";

export const load = async ({ fetch }) => {
  const request = await fetch("");
  const homes: HomeTowels<string>[] = await request.json();
  return { homes };
};
