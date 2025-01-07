"server only";

import { UserTable } from "@/packages/db/schemas";
import type { Connection } from "../Core";
import { Core } from "../Core";
import type { UserInput, UserOutput } from "./user.model";

export class UserRepository extends Core {
  constructor(ctx?: Connection) {
    super(ctx);
  }

  async getByUsernameOrEmail(
    username: string,
    email: string,
  ): Promise<UserOutput | undefined> {
    return this.db.query.UserTable.findFirst({
      where: (q, { eq, or }) =>
        or(eq(q.username, username), eq(q.email, email)),
    });
  }

  async create(input: UserInput): Promise<UserOutput[]> {
    return this.db.insert(UserTable).values(input).returning();
  }

  async getByIdentifier(identifier: string): Promise<UserOutput | undefined> {
    return this.db.query.UserTable.findFirst({
      where: (q, { eq, or }) =>
        or(eq(q.email, identifier), eq(q.username, identifier)),
    });
  }
}
