import { NextRequest, NextResponse } from 'next/server'
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory'
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { OpenAIEmbeddings } from '@langchain/openai'
import { PineconeStore } from '@langchain/pinecone'
import { Pinecone } from '@pinecone-database/pinecone'
import { v4 as uuidv4 } from 'uuid'

// Initialize Pinecone
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
})

// Initialize embeddings
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    const documents = []

    for (const file of files) {
      const content = await file.text()
      const doc = {
        pageContent: content,
        metadata: {
          id: uuidv4(),
          filename: file.name,
          type: file.type,
          size: file.size,
          uploadedAt: new Date().toISOString(),
        },
      }
      documents.push(doc)
    }

    // Split documents into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    })

    const docs = await textSplitter.createDocuments(
      documents.map(doc => doc.pageContent),
      documents.map(doc => doc.metadata)
    )

    // Store in vector database
    const vectorStore = await PineconeStore.fromDocuments(
      docs,
      embeddings,
      { pineconeIndex: pinecone.Index(process.env.PINECONE_INDEX!) }
    )

    return NextResponse.json({
      message: `Successfully ingested ${documents.length} documents`,
      documentCount: documents.length,
      chunkCount: docs.length,
    })
  } catch (error) {
    console.error('Ingestion Error:', error)
    return NextResponse.json({ error: 'Failed to ingest documents' }, { status: 500 })
  }
}</content>
<parameter name="filePath">e:\Projects_Local_Machine\stitch_aura_knowledge_os\stitch_aura_knowledge_os\app\api\ingest\route.ts