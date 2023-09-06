import type { HomeTowels } from "$lib/server/home/service/getUserHomesTowels";

export const load = async ({ fetch }) => {
  const request = await fetch("");
  const homes: HomeTowels<string, string>[] = await request.json();

  return { homes };
};
