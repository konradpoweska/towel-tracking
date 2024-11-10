import { env } from "$env/dynamic/private";
import base64url from "base64url";
import crypto from "crypto";
import type { ObjectId } from "mongodb";

const textEncoder = new TextEncoder();

const lazy = <T>(init: () => T) => {
  let a: T;
  return () => a ?? (a = init());
};

const getSigningSecret = (): string | undefined =>
  env.NODE_ENV === "test" ? "test" : env.SIGNING_SECRET;

// Lazy init avoids requiring the secret when building in Docker
const key = lazy(() =>
  crypto.subtle.importKey(
    "raw",
    textEncoder.encode(getSigningSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  ),
);

const serialize = (ab: ArrayBuffer): string =>
  base64url.encode(
    String.fromCharCode.apply(
      null,
      // @ts-ignore
      new Uint8Array(ab),
    ),
  );

const deserialize = (s: string): ArrayBuffer => {
  const decoded = base64url.decode(s);
  const a = new Uint8Array(decoded.length);
  for (let i = 0; i < decoded.length; i++) a[i] = decoded.charCodeAt(i);
  return a.buffer;
};

export const signObjectId = async (homeId: ObjectId): Promise<string> =>
  serialize(await crypto.subtle.sign("HMAC", await key(), homeId.id));

export const verifyObjectIdSignature = async (
  signature: string,
  objectId: ObjectId,
): Promise<boolean> =>
  crypto.subtle.verify(
    "HMAC",
    await key(),
    deserialize(signature),
    objectId.id,
  );
