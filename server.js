const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// Serve the main dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard_overview', 'code.html'))
})

// Serve other pages
app.get('/agents', (req, res) => {
  res.sendFile(path.join(__dirname, 'ai_agents_dashboard', 'code.html'))
})

app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'advanced_search', 'code.html'))
})

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'ai_chat_retrieval', 'code.html'))
})

app.get('/playground', (req, res) => {
  res.sendFile(path.join(__dirname, 'ai_playground', 'code.html'))
})

app.get('/sources', (req, res) => {
  res.sendFile(path.join(__dirname, 'data_sources_hub', 'code.html'))
})

app.get('/clusters', (req, res) => {
  res.sendFile(path.join(__dirname, 'knowledge_clusters', 'code.html'))
})

app.get('/graph', (req, res) => {
  res.sendFile(path.join(__dirname, 'knowledge_graph', 'code.html'))
})

app.get('/library', (req, res) => {
  res.sendFile(path.join(__dirname, 'knowledge_library', 'code.html'))
})

app.get('/insights', (req, res) => {
  res.sendFile(path.join(__dirname, 'learning_insights', 'code.html'))
})

app.get('/timeline', (req, res) => {
  res.sendFile(path.join(__dirname, 'memory_timeline', 'code.html'))
})

app.get('/privacy', (req, res) => {
  res.sendFile(path.join(__dirname, 'privacy_settings', 'code.html'))
})

app.get('/capture', (req, res) => {
  res.sendFile(path.join(__dirname, 'quick_capture_overlay', 'code.html'))
})

app.get('/versions', (req, res) => {
  res.sendFile(path.join(__dirname, 'version_history', 'code.html'))
})

// API Routes
app.post('/api/rag', async (req, res) => {
  const { query } = req.body
  // Mock RAG response
  res.json({
    answer: `This is a mock response for query: "${query}". In a real implementation, this would use LangChain and Pinecone for RAG.`,
    sources: [
      { content: 'Mock source content', metadata: { title: 'Mock Document' } }
    ]
  })
})

app.post('/api/agents', async (req, res) => {
  const { agentType, query } = req.body
  // Mock agent response
  res.json({
    response: `Agent ${agentType} processed: "${query}". This is a mock response.`
  })
})

app.post('/api/ingest', async (req, res) => {
  // Mock ingestion response
  res.json({
    message: 'Mock ingestion completed',
    documentCount: 5,
    chunkCount: 25
  })
})

app.post('/api/chat', async (req, res) => {
  const { message } = req.body
  // Mock chat response
  res.json({
    response: `Mock AI response to: "${message}"`,
    suggestions: ['Follow-up question 1', 'Follow-up question 2']
  })
})

app.get('/api/analytics', (req, res) => {
  // Mock analytics data
  res.json({
    learningTrends: [
      { date: '2024-01-01', topics: 5, interactions: 23 }
    ],
    topicDistribution: [
      { topic: 'AI', count: 10, percentage: 50 }
    ]
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Personal Knowledge OS server running on http://localhost:${PORT}`)
})