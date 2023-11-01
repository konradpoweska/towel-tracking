import { redirect, type Load } from "@sveltejs/kit";

export const trailingSlash = "always";

export const load: Load = () => {
  throw redirect(301, "./towels");
};
