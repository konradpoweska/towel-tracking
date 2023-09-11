import type { HomeTowels } from "$lib/server/home/service/getUserHomesTowels";

export const load = async ({ depends, fetch }) => {
  depends("db:towels");
  const request = await fetch("");
  const homes: HomeTowels<string, string>[] = await request.json();

  return { homes };
};
