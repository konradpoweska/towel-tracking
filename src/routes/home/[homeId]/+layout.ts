import { handleResponse } from "$lib/utils";
import type { Load } from "@sveltejs/kit";
import type { HomeWithUsers } from "../../api/homes/[homeId]/getHome";

export type Home = HomeWithUsers<string>;

export const load: Load = async ({ depends, fetch, params: { homeId } }) => {
  depends("home");
  return {
    home: await fetch(`/api/homes/${homeId}`).then(handleResponse<Home>),
  };
};
