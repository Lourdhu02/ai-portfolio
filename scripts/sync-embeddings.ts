import { syncEmbeddings } from '../src/lib/rag/syncer'

async function main() {
  console.log('Starting embedding sync...')
  const result = await syncEmbeddings({
    sourceTypes: ['profile', 'projects', 'blogs'],
    force: true,
  })
  console.log(`Sync complete: ${result.chunksProcessed} chunks processed in ${result.elapsedMs}ms`)
  if (result.errors.length > 0) {
    console.error('Errors:', result.errors)
  }
}

main().catch(console.error)
