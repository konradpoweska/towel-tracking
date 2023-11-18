import { request } from "$lib/request";
import type { Towel } from "../../../api/homes/[homeId]/towels/+server";
import type { PageLoad } from "./$types";

export type { Towel };

export const load: PageLoad = async ({
  data,
  depends,
  fetch,
  params: { homeId },
}) => {
  depends("towels");

  return {
    ...data,
    towels: await request<Towel[]>(fetch, `/api/homes/${homeId}/towels`),
  };
};
