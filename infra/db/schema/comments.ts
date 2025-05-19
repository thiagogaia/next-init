import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { posts } from './posts';

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  postId: integer('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }), // se apagar post, apaga comentários
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
