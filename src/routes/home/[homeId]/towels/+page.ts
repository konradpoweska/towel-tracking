import { request } from "$lib/request";
import type { LayoutLoad } from "../$types";
import type { Towel } from "../../../api/homes/[homeId]/towels/+server";

export type { Towel };

export const load: LayoutLoad = async ({
  depends,
  fetch,
  params: { homeId },
}) => {
  depends("towels");
  return {
    towels: await request<Towel[]>(fetch, `/api/homes/${homeId}/towels`),
  };
};
