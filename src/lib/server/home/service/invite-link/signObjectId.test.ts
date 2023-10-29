import { ObjectId } from "mongodb";
import { expect, it } from "vitest";
import { signObjectId, verifyObjectIdSignature } from "./signObjectId";

it("creates a signature which is verified as correct", async () => {
  const homeId = new ObjectId("653373063bc06ecd09a1cb54");

  const signature = await signObjectId(homeId);
  const valid = await verifyObjectIdSignature(signature, homeId);

  expect(valid).toBeTruthy();
});

it("reports an invalid signature", async () => {
  const homeId = new ObjectId("653373063bc06ecd09a1cb54");

  const signature = (await signObjectId(homeId)) + "foo";
  const valid = await verifyObjectIdSignature(signature, homeId);

  expect(valid).toBeFalsy();
});
