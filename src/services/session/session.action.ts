"use server";

import { getSessionTokenCookie } from "@/packages/cookies";
import type { SessionValidationResult } from "./session.model";
import { SessionRepository } from "./session.repository";

export const getSession = async (): Promise<SessionValidationResult> => {
  const token = await getSessionTokenCookie();

  if (token === null) {
    return { session: null, user: null };
  }

  const sessionRepository = new SessionRepository();

  const result = await sessionRepository.validateToken(token);

  return result;
};

export const actionSessionGuard = async () => {
  const { session } = await getSession();

  if (!session) {
    throw new Error("Not authenticated");
  }

  return session;
};
