"use server";

import { SessionManager } from "@/models/session";
import { UserModel } from "@/models/user";
import { response } from "@/packages/action-handler/response";
import { setSessionTokenCookie } from "@/packages/cookies-handler";
import { verifyPassword } from "@/services/password";
import { z } from "zod";

const signinSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export const signinAction = async (input: z.infer<typeof signinSchema>) => {
  const validatedInput = signinSchema.parse(input);

  const user = await UserModel.getByIdentifier(validatedInput.identifier);

  if (!user) {
    throw "Invalid credentials";
  }

  await verifyPassword(user.password, validatedInput.password);

  const session = await SessionManager.create(user.id);

  await setSessionTokenCookie(session.id, session.expiresAt);

  return response(session);
};
