import { ObjectId } from "mongodb";
import { z } from "zod";

export const objectIdSchema = z.union([
  z.instanceof(ObjectId),
  z.string().transform((s) => new ObjectId(s)),
]);
