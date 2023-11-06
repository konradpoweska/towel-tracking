import { browser } from "$app/environment";
import { error } from "@sveltejs/kit";
import { addNotification } from "./components/Notifications/store";

export const request = async <T = undefined>(
  fetchFn: typeof fetch,
  ...params: Parameters<typeof fetch>
): Promise<T> => {
  let res;
  try {
    res = await fetchFn(...params);
  } catch (e) {
    return await handleError("Network error");
  }
  if (!res.ok) await handleError(await getResponseError(res), res.status);
  return getJson<T>(res);
};

const getJson = <T>(res: Response): Promise<T> =>
  res.json().catch(() => undefined);

type Error = string;

const handleError = async (err: Error, status = 500) => {
  if (browser)
    addNotification({
      kind: "error",
      title: "Request failed",
      subtitle: err,
    });

  throw error(status, err);
};

const getResponseError = async (res: Response): Promise<Error> =>
  (await getJson<any>(res))?.message ?? res.statusText;
