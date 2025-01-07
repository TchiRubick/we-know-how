import { UserTable } from "@/packages/db/schemas";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const zUserOutput = createSelectSchema(UserTable);
export type UserOutput = z.infer<typeof zUserOutput>;

export const zUserInput = createInsertSchema(UserTable, {
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  phone: z.string().min(10).max(10),
  address: z.string().min(3).max(100),
  city: z.string().min(3).max(100),
  country: z.string().min(3).max(100),
  zipCode: z.string().min(3).max(100),
  birthYear: z.number().min(1900).max(new Date().getFullYear()),
});
export type UserInput = z.infer<typeof zUserInput>;

export const zSigninInput = zUserInput
  .pick({ password: true })
  .merge(z.object({ identifier: z.string() }));

export type SigninInput = z.infer<typeof zSigninInput>;

export const zRegister = zUserInput
  .pick({
    username: true,
    email: true,
    password: true,
    phone: true,
    address: true,
    city: true,
    country: true,
    zipCode: true,
    birthYear: true,
  })
  .merge(
    z.object({ birthYear: z.number().min(1900).max(new Date().getFullYear()) }),
  );

export type RegisterInput = z.infer<typeof zRegister>;
