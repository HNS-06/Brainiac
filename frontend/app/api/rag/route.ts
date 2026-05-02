import { NextRequest, NextResponse } from 'next/server'
import { ChatOpenAI } from '@langchain/openai'
import { PineconeStore } from '@langchain/pinecone'
import { OpenAIEmbeddings } from '@langchain/openai'
import { Pinecone } from '@pinecone-database/pinecone'
import { RetrievalQAChain } from 'langchain/chains'

// Initialize Pinecone
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
})

// Initialize embeddings and vector store
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY!,
})

const vectorStore = await PineconeStore.fromExistingIndex(
  embeddings,
  { pineconeIndex: pinecone.Index(process.env.PINECONE_INDEX!) }
)

// Initialize LLM
const llm = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY!,
  modelName: 'gpt-4',
  temperature: 0.3,
})

// Create RAG chain
const chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever())

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    // Perform RAG
    const result = await chain.call({
      query: query,
    })

    return NextResponse.json({
      answer: result.text,
      sources: result.sourceDocuments?.map(doc => ({
        content: doc.pageContent,
        metadata: doc.metadata,
      })),
    })
  } catch (error) {
    console.error('RAG Error:', error)
    return NextResponse.json({ error: 'Failed to process query' }, { status: 500 })
  }
}</content>
<parameter name="filePath">e:\Projects_Local_Machine\stitch_aura_knowledge_os\stitch_aura_knowledge_os\app\api\rag\route.ts