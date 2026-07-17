import { pgTable, uuid, text, timestamp, jsonb, index } from 'drizzle-orm/pg-core'

export const embeddings = pgTable('embeddings', {
  id: uuid('id').defaultRandom().primaryKey(),
  content: text('content').notNull(),
  metadata: jsonb('metadata').$type<{
    sourceType: 'profile' | 'project' | 'blog' | 'skill'
    sourceId: string
    section?: string
    language?: string
  }>().notNull(),
  embedding: text('embedding').notNull(),
  tokenCount: text('token_count').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  boostFactor: text('boost_factor').default('1.0').notNull(),
}, (table) => ({
  sourceIdx: index('source_idx').on(table.metadata),
}))

export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  anonymousId: text('anonymous_id').notNull(),
  messages: jsonb('messages').$type<any[]>().notNull().default([]),
  metadata: jsonb('metadata').$type<{
    userAgent?: string
    referrer?: string
    deviceType?: 'mobile' | 'tablet' | 'desktop'
  }>().default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const contacts = pgTable('contacts', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  subject: text('subject'),
  message: text('message').notNull(),
  sessionId: text('session_id'),
  source: text('source').default('contact_form').notNull(),
  status: text('status').$type<'new' | 'read' | 'replied'>().default('new').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const queryLogs = pgTable('query_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  query: text('query').notNull(),
  retrievedChunks: jsonb('retrieved_chunks').$type<string[]>().notNull().default([]),
  clickedChunks: jsonb('clicked_chunks').$type<string[]>().notNull().default([]),
  userFeedback: text('user_feedback').$type<'thumbs_up' | 'thumbs_down' | null>(),
  latencyMs: text('latency_ms'),
  sessionId: text('session_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
