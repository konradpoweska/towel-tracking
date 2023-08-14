import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getTowels } from "$lib/server/towels/service";

export const GET: RequestHandler = async () => {
    const towels = await getTowels();
    return json({ towels });
};
