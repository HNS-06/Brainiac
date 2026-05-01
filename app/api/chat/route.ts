import { NextRequest, NextResponse } from 'next/server'
import { ChatOpenAI } from '@langchain/openai'
import { BufferMemory } from 'langchain/memory'
import { ConversationChain } from 'langchain/chains'
import { PromptTemplate } from '@langchain/core/prompts'

// Initialize LLM
const llm = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY!,
  modelName: 'gpt-4',
  temperature: 0.7,
})

// Memory store (in production, use Redis or database)
const memoryStore = new Map<string, BufferMemory>()

const getMemory = (sessionId: string) => {
  if (!memoryStore.has(sessionId)) {
    memoryStore.set(sessionId, new BufferMemory())
  }
  return memoryStore.get(sessionId)!
}

const SYSTEM_PROMPT = `You are an intelligent knowledge assistant with access to a vast knowledge base. You help users organize, understand, and expand their knowledge.

Key capabilities:
- Answer questions based on retrieved knowledge
- Provide citations and sources
- Generate insights and connections
- Suggest related topics and follow-up questions
- Maintain context across conversations
- Be proactive in offering relevant information

Always be helpful, accurate, and engaging. When appropriate, suggest ways to deepen understanding or explore related concepts.`

const prompt = PromptTemplate.fromTemplate(`
${SYSTEM_PROMPT}

Current conversation:
{history}

Human: {input}
Assistant:`)

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId = 'default' } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const memory = getMemory(sessionId)
    const chain = new ConversationChain({
      llm,
      memory,
      prompt,
      verbose: false,
    })

    const response = await chain.call({ input: message })

    // Generate follow-up suggestions
    const suggestions = await generateSuggestions(message, response.response)

    return NextResponse.json({
      response: response.response,
      suggestions,
      sessionId,
    })
  } catch (error) {
    console.error('Chat Error:', error)
    return NextResponse.json({ error: 'Failed to process chat message' }, { status: 500 })
  }
}

async function generateSuggestions(userMessage: string, aiResponse: string): Promise<string[]> {
  const suggestionPrompt = `Based on this conversation, suggest 3 relevant follow-up questions or topics the user might want to explore:

User: ${userMessage}
AI: ${aiResponse}

Suggestions:`

  try {
    const result = await llm.invoke(suggestionPrompt)
    const suggestions = result.content
      .split('\n')
      .filter(line => line.trim().length > 0)
      .slice(0, 3)
      .map(line => line.replace(/^\d+\.\s*/, '').trim())

    return suggestions
  } catch (error) {
    console.error('Suggestion generation error:', error)
    return []
  }
}</content>
<parameter name="filePath">e:\Projects_Local_Machine\stitch_aura_knowledge_os\stitch_aura_knowledge_os\app\api\chat\route.ts