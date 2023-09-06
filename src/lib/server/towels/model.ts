import type { Towel } from "$lib/models/towel";
import { database } from "../db";

export const towels = database.collection<Towel>("towels");
