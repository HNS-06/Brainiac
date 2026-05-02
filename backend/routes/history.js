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
      .orderBy('timestamp', 'desc')
      .limit(50)
      .get();
      
    const history = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(history);
  } catch (error) {
    console.error('History Route Error:', error);
    res.status(500).json({ error: 'Failed to fetch memory timeline' });
  }
});

module.exports = router;
