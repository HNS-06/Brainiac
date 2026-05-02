const express = require('express');
const router = express.Router();
const { db, auth } = require('../utils/firebase');
const { verifyAuth } = require('../middlewares/authMiddleware');

router.use(verifyAuth);

/**
 * Get user profile including Cortex ID
 */
router.get('/profile', async (req, res) => {
  try {
    const userRef = db.collection('users').doc(req.user.uid);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      // Auto-create profile if missing
      const newProfile = {
        uid: req.user.uid,
        email: req.user.email,
        cortexId: `BRAIN-${Math.floor(100000 + Math.random() * 900000)}`,
        displayName: req.user.email.split('@')[0],
        createdAt: new Date().toISOString()
      };
      await userRef.set(newProfile);
      return res.json(newProfile);
    }
    
    res.json(userDoc.data());
  } catch (error) {
    console.error('Profile Error:', error);
    res.status(500).json({ error: 'Failed to fetch or create profile' });
  }
});

/**
 * Update user profile
 */
router.post('/profile', async (req, res) => {
  try {
    const { displayName } = req.body;
    await db.collection('users').doc(req.user.uid).update({ displayName });
    res.json({ message: 'Profile updated' });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

/**
 * Export all user data (Documents, Chats, Profile)
 */
router.get('/export', async (req, res) => {
  try {
    const userId = req.user.uid;
    const [docs, chats, history, user] = await Promise.all([
      db.collection('documents').where('userId', '==', userId).get(),
      db.collection('chats').where('userId', '==', userId).get(),
      db.collection('history').where('userId', '==', userId).get(),
      db.collection('users').doc(userId).get()
    ]);

    const data = {
      profile: user.data(),
      documents: docs.docs.map(d => d.data()),
      chats: chats.docs.map(d => d.data()),
      history: history.docs.map(d => d.data()),
      exportedAt: new Date().toISOString()
    };

    console.log(`Exported data for user: ${userId}`);
    res.json(data);
  } catch (error) {
    console.error('Export Error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Wipe Cortex (Delete all user data)
 */
router.delete('/wipe', async (req, res) => {
  try {
    const userId = req.user.uid;
    
    // 1. Delete documents metadata
    const docs = await db.collection('documents').where('userId', '==', userId).get();
    const batch = db.batch();
    docs.forEach(doc => batch.delete(doc.ref));
    
    // 2. Delete chats
    const chats = await db.collection('chats').where('userId', '==', userId).get();
    chats.forEach(doc => batch.delete(doc.ref));

    // 3. Delete history
    const history = await db.collection('history').where('userId', '==', userId).get();
    history.forEach(doc => batch.delete(doc.ref));

    await batch.commit();
    
    // Note: Vector deletion in Pinecone should also happen here ideally.
    
    res.json({ message: 'Cortex wiped successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Wipe failed' });
  }
});

module.exports = router;
