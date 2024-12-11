import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { MediaType } from "./enums";
import { UserTable } from "./user";

export const MediaTable = pgTable("media", (t) => ({
  id: t
    .text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: t.varchar("name", { length: 255 }).notNull(),
  url: t.text("url").notNull(),
  type: MediaType("type").notNull(),
  size: t.integer("size"),
  mimeType: t.varchar("mime_type", { length: 127 }),
  createdAt: t.timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: t.timestamp("updated_at", { withTimezone: true }).defaultNow(),
}));

export const MediaUserTable = pgTable("media_user", (t) => ({
  id: t
    .text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: t
    .text("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  mediaId: t
    .text("media_id")
    .notNull()
    .references(() => MediaTable.id, { onDelete: "cascade" }),
  createdAt: t.timestamp("created_at", { withTimezone: true }).defaultNow(),
}));

export const MediaUserRelations = relations(MediaUserTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [MediaUserTable.userId],
    references: [UserTable.id],
  }),
  media: one(MediaTable, {
    fields: [MediaUserTable.mediaId],
    references: [MediaTable.id],
  }),
}));

export const MediaRelations = relations(MediaTable, ({ many }) => ({
  userConnections: many(MediaUserTable),
}));
