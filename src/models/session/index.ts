"server only";

import { db } from "@/packages/db";
import { SessionTable, UserTable } from "@/packages/db/schemas";
import {
  encodeBase32LowerCaseNoPadding
} from "@oslojs/encoding";
import { eq } from "drizzle-orm";
import type { Session, SessionValidationResult } from "./type";

export class SessionManager {
  private static readonly SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 days
  private static readonly REFRESH_THRESHOLD_MS = 1000 * 60 * 60 * 24 * 15; // 15 days

  static async create(userId: string): Promise<Session> {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    const sessionId = encodeBase32LowerCaseNoPadding(bytes);

    const session: Session = {
      id: sessionId,
      userId,
      expiresAt: new Date(Date.now() + this.SESSION_DURATION_MS),
    };

    await db.insert(SessionTable).values(session);
    return session;
  }

  static async invalidate(sessionId: string): Promise<void> {
    await db.delete(SessionTable).where(eq(SessionTable.id, sessionId));
  }

  static async validateToken(token: string): Promise<SessionValidationResult> {
    const result = await db
      .select({ user: UserTable, session: SessionTable })
      .from(SessionTable)
      .innerJoin(UserTable, eq(SessionTable.userId, UserTable.id))
      .where(eq(SessionTable.id, token));

    if (result.length < 1) {
      return { session: null, user: null };
    }

    const { user, session } = result[0];

    if (Date.now() >= session.expiresAt.getTime()) {
      await this.invalidate(session.id);
      return { session: null, user: null };
    }

    if (Date.now() >= session.expiresAt.getTime() - this.REFRESH_THRESHOLD_MS) {
      session.expiresAt = new Date(Date.now() + this.SESSION_DURATION_MS);
      await db
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
