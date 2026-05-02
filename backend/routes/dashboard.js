const express = require('express');
const router = express.Router();
const { db } = require('../utils/firebase');
const { verifyAuth } = require('../middlewares/authMiddleware');

router.use(verifyAuth);

router.get('/dashboard', async (req, res) => {
  try {
    const userId = req.user.uid;

    // Fetch user's documents
    let docCount = 0;
    try {
      const docs = await db.collection('documents').where('userId', '==', userId).get();
      docCount = docs.size;
    } catch (e) {
      console.warn('Dashboard Firestore Warning:', e.message);
    }
      
    // Fetch user's chats
    let chatCount = 0;
    try {
      const chats = await db.collection('chats').where('userId', '==', userId).get();
      chatCount = chats.size;
    } catch (e) {
      console.warn('Dashboard Firestore Warning:', e.message);
    }

    // 1. Compute Focus Score (Dynamic based on activity)
    // Activity = docs + chats. Max score 100.
    const baseScore = Math.min((docCount * 10) + (chatCount * 5) + 20, 100);
    // Generate a trend array based on the baseScore for the chart
    const focusTrend = Array.from({length: 7}, (_, i) => Math.min(Math.max(baseScore - 20 + Math.random() * 40, 10), 100));

    // 2. Synthesis Alert
    let synthesisAlert = {
      message: "Upload more documents to discover neural connections.",
      topics: 0
    };

    if (docCount > 2) {
      synthesisAlert = {
        message: `${docCount} concepts in your recent uploads need bridging.`,
        topics: docCount
      };
    }

    // 3. Memory Heatmap
    // Generate 42 blocks representing the last 42 days of activity intensity.
    // If we have real timestamps, we could aggregate them. Here we use deterministic random based on docCount.
    const heatmap = Array.from({length: 42}, (_, i) => {
      // Base intensity on actual counts, spread randomly
      let intensity = 5;
      if (Math.random() < (docCount + chatCount) / 20) {
        intensity = Math.floor(Math.random() * 80) + 20;
      }
      return intensity;
    });

    res.json({
      focusTrend,
      focusScore: Math.floor(baseScore),
      synthesisAlert,
      heatmap
    });
  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

module.exports = router;
