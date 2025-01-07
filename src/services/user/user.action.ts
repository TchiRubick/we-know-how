"use server";

import {
  deleteSessionTokenCookie,
  setSessionTokenCookie,
} from "@/packages/cookies";
import { hashPassword, verifyPassword } from "@/packages/password";
import type { z } from "zod";
import { getSession } from "../session/session.action";
import { SessionRepository } from "../session/session.repository";
import { zRegister, zSigninInput } from "./user.model";
import { UserRepository } from "./user.repository";

export const signinAction = async (input: z.infer<typeof zSigninInput>) => {
  const validatedInput = zSigninInput.parse(input);

  const User = new UserRepository();

  const user = await User.getByIdentifier(validatedInput.identifier);

  if (!user) {
    throw "Invalid credentials";
  }

  await verifyPassword(user.password, validatedInput.password);

  const sessionRepository = new SessionRepository();

  const session = await sessionRepository.create(user.id);

  await setSessionTokenCookie(session.id, session.expiresAt);

  return session;
};

export const signupAction = async (input: z.infer<typeof zRegister>) => {
  const validatedInput = zRegister.parse(input);

  const User = new UserRepository();

  const existingUser = await User.getByUsernameOrEmail(
    validatedInput.username,
    validatedInput.email,
  );

  if (existingUser) {
    throw "User already exists";
  }

  const passwordHash = await hashPassword(validatedInput.password);

  const [user] = await User.create({
    ...validatedInput,
    password: passwordHash,
  });

  if (!user) {
    throw "Failed to create user";
  }

  const sessionRepository = new SessionRepository();

  const session = await sessionRepository.create(user.id);

  await setSessionTokenCookie(session.id, session.expiresAt);

  return session;
};

export const signoutAction = async () => {
  const sessionRepository = new SessionRepository();

  const session = await getSession();

  if (!session?.session) {
    return true;
  }

  await sessionRepository.invalidate(session.session.id);

  await deleteSessionTokenCookie();

  return true;
};
