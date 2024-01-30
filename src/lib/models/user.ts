import type { User as AuthUser } from "@auth/core/types";

export type User = Omit<AuthUser, "id">;
