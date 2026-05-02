const express = require('express');
const router = express.Router();
const multer = require('multer');
const { db } = require('../utils/firebase');
const { processDocument } = require('../services/documentService');
const { verifyAuth } = require('../middlewares/authMiddleware');

const upload = multer({ storage: multer.memoryStorage() });

/**
 * Upload and process document
 */
router.post('/upload', verifyAuth, upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const userId = req.user.uid;
    const docId = await processDocument(file, userId);
    
    res.json({ message: 'Document processed and indexed', documentId: docId });
  } catch (error) {
    console.error('Upload route error:', error);
    res.status(500).json({ error: 'Failed to process document' });
  }
});

/**
 * List user documents
 */
router.get('/', verifyAuth, async (req, res) => {
  try {
    const userId = req.user.uid;
    const snapshot = await db.collection('documents')
      .where('userId', '==', userId)
      .orderBy('uploadedAt', 'desc')
      .get();
      
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(docs);
  } catch (error) {
    console.error('Fetch docs error:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

module.exports = router;
