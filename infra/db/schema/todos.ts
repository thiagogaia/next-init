import { integer, text, boolean, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const todos = pgTable("todos", {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
});

