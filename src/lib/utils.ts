import { error } from "@sveltejs/kit";

export type WithId<Id, T> = T & { _id: Id };

export const handleResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) throw error(res.status, (await res.json()).message);
  return res.json();
};
