import { database } from "$lib/server/db";
import { generateUser } from "$lib/server/users/tests";
import { beforeEach, describe, expect, it } from "vitest";
import { generateHome } from "../tests";
import { assertUserIsMember } from "./assertUserIsMember";

describe("assertUserIsMember", () => {
  beforeEach(async () => {
    await database.dropDatabase();
  });
  it("should throw if user is not member", async () => {
    const user = await generateUser();
    const home = await generateHome({ members: [] });
    expect(assertUserIsMember(user._id, home._id)).rejects.toThrow();
  });
  it("should not throw if user is member", async () => {
    const user = await generateUser();
    const home = await generateHome({ members: [user._id] });
    expect(assertUserIsMember(user._id, home._id)).resolves.not.toThrow();
  });
});
