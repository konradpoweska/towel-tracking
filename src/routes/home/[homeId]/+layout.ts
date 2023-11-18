import { request } from "$lib/request";
import type { Load } from "@sveltejs/kit";
import type { Home } from "../../api/homes/[homeId]/+server";

export type { Home };

export const load: Load = async ({ depends, fetch, params: { homeId } }) => {
  depends("home");
  return {
    home: await request<Home>(fetch, `/api/homes/${homeId}`),
  };
};
