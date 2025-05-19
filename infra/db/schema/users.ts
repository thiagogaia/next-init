import { integer, text, boolean, pgTable, serial, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  document: text('document'),
  picture_url: text('picture_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

