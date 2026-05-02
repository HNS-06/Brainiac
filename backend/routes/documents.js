const express = require('express');
const router = express.Router();
const multer = require('multer');
const { db } = require('../utils/firebase');
const { processDocument } = require('../services/documentService');
const { verifyAuth } = require('../middlewares/authMiddleware');

const upload = multer({ storage: multer.memoryStorage() });

/**
 * Upload and process multiple documents
 */
router.post('/upload', verifyAuth, upload.array('files'), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) return res.status(400).json({ error: 'No files uploaded' });

    const userId = req.user.uid;
    const documentIds = [];

    for (const file of files) {
      const docId = await processDocument(file, userId);
      documentIds.push(docId);
    }
    
    res.json({ message: 'Documents processed and indexed', documentIds });
  } catch (error) {
    console.error('Upload route error:', error);
    res.status(500).json({ error: 'Failed to process documents' });
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
      .get();
      
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    docs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
    res.json(docs);
  } catch (error) {
    console.error('Fetch docs error:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

module.exports = router;
