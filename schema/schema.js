import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  description: text('description'),
  authorID: text('author_id').notNull(),
  authorFullName: text('author_full_name').notNull(),
  published: integer('published', { mode: 'boolean' }).default(false),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
})
