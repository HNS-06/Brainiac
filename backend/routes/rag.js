const express = require('express');
const router = express.Router();
const { performStreamingRAG } = require('../services/ragService');
const { verifyAuth } = require('../middlewares/authMiddleware');
const { aiLimiter } = require('../middlewares/rateLimiter');

/**
 * SSE Endpoint for streaming chat
 */
router.get('/stream', verifyAuth, aiLimiter, async (req, res) => {
  const { query } = req.query;
  const userId = req.user.uid;

  if (!query) return res.status(400).json({ error: 'Query is required' });

  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {
    const { stream, sources } = await performStreamingRAG(query, userId);

    // Send sources first
    res.write(`data: ${JSON.stringify({ type: 'sources', sources })}\n\n`);

    // Stream chunks
    for await (const chunk of stream) {
      const chunkText = chunk.text();
      res.write(`data: ${JSON.stringify({ type: 'chunk', text: chunkText })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('SSE Error:', error);
    res.write(`data: ${JSON.stringify({ type: 'error', message: 'Failed to stream response' })}\n\n`);
    res.end();
  }
});

module.exports = router;
