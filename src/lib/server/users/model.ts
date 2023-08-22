import type { User } from "@auth/core/types";
import { database } from "../db";

export const users = database.collection<User>("users");
