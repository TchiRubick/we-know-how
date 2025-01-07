import { SessionTable } from "@/packages/db/schemas";
import { createSelectSchema } from "drizzle-zod";
import type { z } from "zod";
import type { UserOutput } from "../user/user.model";

export const zSessionOutput = createSelectSchema(SessionTable);
export type Session = z.infer<typeof zSessionOutput>;

export type SessionValidationResult =
  | { session: Session; user: Omit<UserOutput, "password"> }
  | { session: null; user: null };
