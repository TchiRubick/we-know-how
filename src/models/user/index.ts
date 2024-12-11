"server only";

import { db } from "@/packages/db";
import { UserTable } from "@/packages/db/schemas";
import type { InferInsertModel } from "drizzle-orm";

export class UserModel {
  static async getByUsernameOrEmail(username: string, email: string) {
    return db.query.UserTable.findFirst({
      where: (q, { eq, or }) =>
        or(eq(q.username, username), eq(q.email, email)),
    });
  }

  static async create(input: InferInsertModel<typeof UserTable>) {
    return db.insert(UserTable).values(input).returning();
  }

  static async getByIdentifier(identifier: string) {
    return db.query.UserTable.findFirst({
      where: (q, { eq, or }) =>
        or(eq(q.email, identifier), eq(q.username, identifier)),
    });
  }
}
