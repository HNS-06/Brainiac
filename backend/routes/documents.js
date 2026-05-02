const express = require('express');
const router = express.Router();
const multer = require('multer');
const { db } = require('../utils/firebase');
const { processDocument } = require('../services/documentService');
const { verifyAuth } = require('../middlewares/authMiddleware');

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

/**
 * Upload and process multiple documents
 */
router.post('/upload', verifyAuth, upload.array('files'), async (req, res) => {
  try {
    console.log('--- UPLOAD START ---');
    console.log('FILES RECEIVED:', req.files);
    console.log('USER ID:', req.user?.uid);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        error: "No files uploaded. Please select files first."
      });
    }

    const userId = req.user.uid;
    const processedFiles = [];

    for (const file of req.files) {
      try {
        console.log(`Processing file: ${file.originalname}`);
        const docId = await processDocument(file, userId);
        
        processedFiles.push({
          id: docId,
          name: file.originalname,
          type: file.mimetype,
          size: file.size
        });
      } catch (fileError) {
        console.error(`FILE PROCESS ERROR for ${file.originalname}:`, fileError);
      }
    }

    res.status(200).json({
      message: "Files uploaded successfully",
      files: processedFiles
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ error: error.message });
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
