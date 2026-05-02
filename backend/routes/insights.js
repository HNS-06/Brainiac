const express = require('express');
const router = express.Router();
const { verifyAuth } = require('../middlewares/authMiddleware');
const { db } = require('../utils/firebase');
const { generateInsights } = require('../services/geminiService');

router.get('/', verifyAuth, async (req, res) => {
  try {
    const userId = req.user.uid;
    const snapshot = await db.collection('documents').where('userId', '==', userId).limit(20).get();
    const docNames = snapshot.docs.map(doc => doc.data().name);
    
    const insightData = await generateInsights(docNames);
    res.json(insightData);
  } catch (error) {
    console.error('Insights Route Error:', error);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

module.exports = router;
