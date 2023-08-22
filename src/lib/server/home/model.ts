import type { Home } from "$lib/models";
import { database, type Id } from "../db";

export const homes = database.collection<Home<Id>>("homes");
