const express = require('express');
const router = express.Router();
const { db } = require('../utils/firebase');
const { verifyAuth } = require('../middlewares/authMiddleware');

/**
 * Fetch unified activity history for the user
 */
router.get('/', verifyAuth, async (req, res) => {
  try {
    const userId = req.user.uid;
    const snapshot = await db.collection('history')
      .where('userId', '==', userId)
      .limit(50)
      .get();
      
    const history = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // Sort in memory to avoid Firestore index requirement
    history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    res.json(history);
  } catch (error) {
    console.error('History Route Error:', error);
    res.status(500).json({ error: 'Failed to fetch memory timeline' });
  }
});

module.exports = router;
