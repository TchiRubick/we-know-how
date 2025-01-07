"server only";

import { SessionTable, UserTable } from "@/packages/db/schemas";
import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";
import { eq } from "drizzle-orm";
import type { Connection } from "../Core";
import { Core } from "../Core";
import type { Session, SessionValidationResult } from "./session.model";

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 days
const REFRESH_THRESHOLD_MS = 1000 * 60 * 60 * 24 * 15; // 15 days

export class SessionRepository extends Core {
  constructor(ctx?: Connection) {
    super(ctx);
  }

  async create(userId: string): Promise<Session> {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const sessionId = encodeBase32LowerCaseNoPadding(bytes);

    const session: Session = {
      id: sessionId,
      userId,
      expiresAt: new Date(Date.now() + SESSION_DURATION_MS),
    };

    await this.db.insert(SessionTable).values(session);
    return session;
  }

  async invalidate(sessionId: string): Promise<void> {
    await this.db.delete(SessionTable).where(eq(SessionTable.id, sessionId));
  }

  async validateToken(token: string): Promise<SessionValidationResult> {
    const result = await this.db
      .select({ user: UserTable, session: SessionTable })
      .from(SessionTable)
      .innerJoin(UserTable, eq(SessionTable.userId, UserTable.id))
      .where(eq(SessionTable.id, token));

    if (result.length < 1) {
      return { session: null, user: null };
    }

    const [{ user, session }] = result;

    if (Date.now() >= session.expiresAt.getTime()) {
      await this.invalidate(session.id);
      return { session: null, user: null };
    }

    if (Date.now() >= session.expiresAt.getTime() - REFRESH_THRESHOLD_MS) {
      session.expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
      await this.db
        .update(SessionTable)
        .set({
          expiresAt: session.expiresAt,
        })
        .where(eq(SessionTable.id, session.id));
    }

    const { password: _, ...rest } = user;

    return { session, user: rest };
  }
}
