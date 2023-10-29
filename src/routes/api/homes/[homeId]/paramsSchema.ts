import { objectIdSchema } from "$lib/server/parsing";
import { z } from "zod";

export const paramsSchema = z.object({
  homeId: objectIdSchema,
});
