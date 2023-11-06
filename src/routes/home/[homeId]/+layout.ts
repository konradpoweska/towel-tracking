import { request } from "$lib/request";
import type { Load } from "@sveltejs/kit";
import type { HomeWithUsers } from "../../api/homes/[homeId]/getHome";

export type Home = HomeWithUsers<string>;

export const load: Load = async ({ depends, fetch, params: { homeId } }) => {
  depends("home");
  return {
    home: await request<Home>(fetch, `/api/homes/${homeId}`),
  };
};
