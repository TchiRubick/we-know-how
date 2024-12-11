import { pgEnum } from "drizzle-orm/pg-core";

export const UserRole = pgEnum("user_role", ["customer", "admin"]);
export const MediaType = pgEnum("media_type", ["image", "video", "document"]);
