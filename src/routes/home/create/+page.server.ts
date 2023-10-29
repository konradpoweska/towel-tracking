import { getUserId } from "$lib/server/utils";
import { redirect } from "@sveltejs/kit";
import { z } from "zod";
import type { Actions } from "./$types";
import { createHome } from "./createHome";

const nameSchema = z
  .string()
  .trim()
  .refine((s) => s.length > 3, {
    message: "Name must be at least 4 characters.",
  });

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const data = await request.formData();
    const nameParsing = nameSchema.safeParse(data.get("name"));
    if (!nameParsing.success) return { success: false };
    const name = nameParsing.data;

    const userId = await getUserId(locals);
    const homeId = await createHome(userId, name);

    throw redirect(302, `/home/${homeId}`);
  },
};
