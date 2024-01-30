import type { Towel } from "$lib/models";
import { database } from "../db";

export const towels = database.collection<Towel>("towels");
