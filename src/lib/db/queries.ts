import { supabase } from './client'
import { embeddings, sessions, contacts, queryLogs } from './schema'

export async function getEmbeddingsBySource(sourceId: string) {
  if (!supabase) return null
  const { data } = await supabase
    .from('embeddings')
    .select('*')
    .eq('metadata->>sourceId', sourceId)
  return data
}

export async function saveSession(sessionData: typeof sessions.$inferInsert) {
  if (!supabase) return null
  const { data } = await supabase
    .from('sessions')
    .insert(sessionData)
    .select()
    .single()
  return data
}

export async function saveContact(contactData: typeof contacts.$inferInsert) {
  if (!supabase) return null
  const { data } = await supabase
    .from('contacts')
    .insert(contactData)
    .select()
    .single()
  return data
}

export async function logQuery(queryData: typeof queryLogs.$inferInsert) {
  if (!supabase) return null
  const { data } = await supabase
    .from('query_logs')
    .insert(queryData)
    .select()
    .single()
  return data
}
