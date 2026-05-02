const express = require('express');
const router = express.Router();
const { verifyAuth } = require('../middlewares/authMiddleware');
const { db } = require('../utils/firebase');
const { generateInsights } = require('../services/geminiService');

router.get('/insights', verifyAuth, async (req, res) => {
  try {
    const userId = req.user.uid;
    const snapshot = await db.collection('documents').where('userId', '==', userId).limit(20).get();
    const docNames = snapshot.docs.map(doc => doc.data().name);
    
    if (docNames.length === 0) {
      return res.json({ 
        learningTrend: "Knowledge Base Initializing",
        summary: "Upload your first documents to see neural patterns and learning trends here.",
        gaps: ["Awaiting data ingest..."]
      });
    }
    
    const insightData = await generateInsights(docNames);
    res.json(insightData);
  } catch (error) {
    console.error('Insights Route Error:', error);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

module.exports = router;
