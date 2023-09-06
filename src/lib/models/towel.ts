import type { ObjectId } from "mongodb";

export interface Towel<Id = ObjectId, D = Date> {
  name: string;
  home: Id;
  user?: Id;
  usedSince?: D;
  washed?: D;
}
