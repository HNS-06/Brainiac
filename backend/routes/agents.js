const express = require('express');
const router = express.Router();
const { verifyAuth } = require('../middlewares/authMiddleware');

router.get('/status', verifyAuth, async (req, res) => {
  res.json({
    agents: [
      { id: 'retriever', name: 'Retriever Agent', status: 'idle' },
      { id: 'summarizer', name: 'Summarizer Agent', status: 'idle' },
      { id: 'verifier', name: 'Verifier Agent', status: 'idle' },
      { id: 'planner', name: 'Planner Agent', status: 'idle' }
    ]
  });
});

router.post('/run', verifyAuth, async (req, res) => {
  const { agentType, query } = req.body;
  res.json({ message: `Agent ${agentType} started processing ${query}` });
});

module.exports = router;
