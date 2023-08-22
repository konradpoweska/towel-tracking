export interface Towel<Id> {
  name: string;
  usedBy: Id;
  usedSince: Date;
  washed?: Date;
  home: Id,
}
