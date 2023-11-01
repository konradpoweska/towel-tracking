import type { Towel as GenericTowel } from "$lib/models";
import { handleResponse, type WithId } from "$lib/utils";
import type { LayoutLoad } from "../$types";

export type Towel = WithId<string, GenericTowel<string, string>>;

export const load: LayoutLoad = async ({
  depends,
  fetch,
  params: { homeId },
}) => {
  depends("towels");
  return {
    towels: await fetch(`/api/homes/${homeId}/towels`).then(
      handleResponse<Towel[]>
    ),
  };
};
