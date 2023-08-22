import type { Towel } from "$lib/models/towel";
import type { ObjectId } from "mongodb";
import { database } from "../db";

export const towels = database.collection<Towel<ObjectId>>("towels");
