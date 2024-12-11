"use server";

import { SessionManager } from "@/models/session";
import { UserModel } from "@/models/user";
import { response } from "@/packages/action-handler/response";
import { setSessionTokenCookie } from "@/packages/cookies-handler";
import { hashPassword } from "@/services/password";
import { z } from "zod";

const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(31, "Username must be less than 31 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, and dashes",
    ),
  email: z.string().email("Invalid email address").toLowerCase(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(255, "Password must be less than 255 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(4, "City must be at least 4 characters"),
  country: z.string().min(4, "Country must be at least 4 characters"),
  zipCode: z.string().min(2, "Zip code must be at least 2 characters"),
});

export const signupAction = async (input: z.infer<typeof signupSchema>) => {
  const validatedInput = signupSchema.parse(input);

  const existingUser = await UserModel.getByUsernameOrEmail(
    validatedInput.username,
    validatedInput.email,
  );

  if (existingUser) {
    throw "User already exists";
  }

  const passwordHash = await hashPassword(validatedInput.password);

  const [user] = await UserModel.create({
    ...validatedInput,
    password: passwordHash,
  });

  if (!user) {
    throw "Failed to create user";
  }

  const session = await SessionManager.create(user.id);

  await setSessionTokenCookie(session.id, session.expiresAt);

  return response(session);
};
