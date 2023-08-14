import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  const request = await fetch("/towels");
  const towels = request.json();
  return towels;
};
