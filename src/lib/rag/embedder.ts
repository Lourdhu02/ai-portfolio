interface EmbeddingResponse {
  embedding: number[]
  dimensions: number
}

export async function embed(text: string): Promise<EmbeddingResponse> {
  const response = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.VOYAGE_API_KEY}`,
    },
    body: JSON.stringify({
      input: text,
      model: 'voyage-3',
      input_type: 'query',
    }),
  })

  if (!response.ok) throw new Error(`Embedding failed: ${response.statusText}`)
  const data = await response.json()
  return { embedding: data.data[0].embedding, dimensions: 1024 }
}

export async function embedMany(texts: string[]): Promise<EmbeddingResponse[]> {
  const response = await fetch('https://api.voyageai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.VOYAGE_API_KEY}`,
    },
    body: JSON.stringify({
      input: texts,
      model: 'voyage-3',
      input_type: 'document',
    }),
  })

  if (!response.ok) throw new Error(`Batch embedding failed: ${response.statusText}`)
  const data = await response.json()
  return data.data.map((d: any) => ({ embedding: d.embedding, dimensions: 1024 }))
}
