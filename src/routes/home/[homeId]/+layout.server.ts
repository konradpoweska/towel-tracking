import { LAST_VIEWED_HOME_COOKIE } from "$lib/server/utils";
import { DateTime } from "luxon";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ cookies, params }) => {
  cookies.set(LAST_VIEWED_HOME_COOKIE, params.homeId, {
    path: "/",
    expires: DateTime.now().plus({ months: 3 }).toJSDate(),
  });
};
