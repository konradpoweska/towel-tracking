import { objectIdSchema } from "$lib/server/parsing";
import { paramsSchema as parentParamsSchema } from "../../paramsSchema";

export default parentParamsSchema.extend({
  towelId: objectIdSchema,
});
