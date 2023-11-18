import { objectIdSchema } from "$lib/server/parsing";
import { paramsSchema } from "../../paramsSchema";

export default paramsSchema.extend({
  memberId: objectIdSchema,
});
