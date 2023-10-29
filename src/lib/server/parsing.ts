import { error } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { z } from "zod";

export const objectIdSchema = z.union([
  z.instanceof(ObjectId),
  z
    .string()
    .length(24)
    .transform((s, ctx) => {
      if (!ObjectId.isValid(s))
        throw ctx.addIssue({ code: "custom", message: "Invalid _id" });
      return new ObjectId(s);
    }),
]);

export const safeParse = <Output>(
  schema: z.Schema<Output, any, any>,
  content: unknown,
  failureStatus: number,
  failureMessage?: string
): Output => {
  const parsingResult = schema.safeParse(content);
  if (!parsingResult.success)
    throw error(
      failureStatus,
      failureMessage ??
        parsingResult.error.errors
          .map((e) => `${e.path}: ${e.message}`)
          .join(". \n")
    );
  return parsingResult.data;
};
