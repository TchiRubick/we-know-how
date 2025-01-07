import { relations } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { UserRole } from "./enums";
import { SessionTable } from "./session";

export const UserTable = pgTable("user", (t) => ({
  id: t
    .text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: t.varchar("username", { length: 255 }).notNull().unique(),
  password: t.varchar("password", { length: 255 }).notNull(),
  email: t.varchar("email", { length: 255 }).notNull().unique(),
  address: t.varchar("address", { length: 255 }),
  avatar: t.varchar("avatar", { length: 255 }),
  phone: t.varchar("phone", { length: 20 }),
  city: t.varchar("city", { length: 100 }),
  country: t.varchar("country", { length: 100 }),
  zipCode: t.varchar("zip_code", { length: 20 }),
  emailVerified: t.timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }),
  role: UserRole("role").default("customer"),
  birthYear: t.integer("birth_year").notNull(),
  createdAt: t.timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: t.timestamp("updated_at", { withTimezone: true }).defaultNow(),
}));

export const UserRelations = relations(UserTable, ({ many }) => ({
  sessions: many(SessionTable),
}));
