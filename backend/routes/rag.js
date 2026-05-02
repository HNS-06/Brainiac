const express = require('express');
const router = express.Router();
const { performStreamingRAG } = require('../services/ragService');
const { verifyAuth } = require('../middlewares/authMiddleware');
const { aiLimiter } = require('../middlewares/rateLimiter');

/**
 * SSE Endpoint for streaming chat
 */
router.get('/stream', verifyAuth, aiLimiter, async (req, res) => {
  const { query, mode = 'Quick' } = req.query;
  const userId = req.user.uid;

  if (!query) return res.status(400).json({ error: 'Query is required' });

  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {
    const { stream, sources } = await performStreamingRAG(query, userId, mode);

    // Send sources first
    res.write(`data: ${JSON.stringify({ type: 'sources', sources })}\n\n`);

    // Stream chunks
    let fullText = '';
    for await (const chunk of stream) {
      const chunkText = chunk.choices[0]?.delta?.content || '';
      if (chunkText) {
        fullText += chunkText;
        res.write(`data: ${JSON.stringify({ type: 'chunk', text: chunkText })}\n\n`);
      }
    }

    // Persist to history after stream finishes
    const { db } = require('../utils/firebase');
    await db.collection('history').add({
      userId,
      type: 'CHAT',
      title: `Queried: "${query.substring(0, 40)}${query.length > 40 ? '...' : ''}"`,
      timestamp: new Date().toISOString(),
      details: { query, response: fullText }
    });

    await db.collection('chats').add({
      userId,
      query,
      response: fullText,
      timestamp: new Date().toISOString()
    });

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('SSE Error:', error);
    res.write(`data: ${JSON.stringify({ type: 'error', message: 'Failed to stream response' })}\n\n`);
    res.end();
  }
});

module.exports = router;
