"use server";

import { SessionManager } from "@/models/session";
import { getSessionTokenCookie } from "@/packages/cookies-handler";

export const getSession = async () => {
  const token = await getSessionTokenCookie();

  if (token === null) {
    return { session: null, user: null };
  }

  const result = await SessionManager.validateToken(token);

  return result;
};

export const actionSessionGuard = async () => {
  const { session } = await getSession();

  if (!session) {
    throw new Error("Not authenticated");
  }

  return session;
};
