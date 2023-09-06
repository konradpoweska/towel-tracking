import type { ObjectId } from "mongodb";

export interface Home<Id = ObjectId> {
  name: string;
  members: Id[];
}
