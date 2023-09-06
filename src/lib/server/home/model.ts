import type { Home } from "$lib/models";
import { database } from "../db";

export const homes = database.collection<Home>("homes");
