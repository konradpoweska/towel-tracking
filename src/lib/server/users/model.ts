import type { User } from "$lib/models";
import { database } from "../db";

export const users = database.collection<User>("users");
