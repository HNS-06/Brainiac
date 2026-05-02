const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    const serviceAccountPath = path.join(__dirname, '../firebase-service-account.json');
    
    if (fs.existsSync(serviceAccountPath)) {
      // Read the file as a string first to handle any weird newline issues
      let saContent = fs.readFileSync(serviceAccountPath, 'utf8');
      
      // If the file itself has literal newlines inside the JSON string (which is invalid), 
      // we try to fix it before parsing.
      try {
        const sa = JSON.parse(saContent);
        // Ensure the private key has actual newlines for PEM format
        if (sa.private_key) {
          sa.private_key = sa.private_key.replace(/\\n/g, '\n');
        }
        admin.initializeApp({
          credential: admin.credential.cert(sa),
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET
        });
        console.log('✅ Firebase Admin initialized successfully using service account JSON');
      } catch (parseError) {
        console.warn('⚠️ JSON parse failed, attempting manual fix...');
        // Manual fix: replace literal newlines that are not part of JSON structure
        // This is a bit risky but we're in a pinch
        const sa = JSON.parse(saContent.replace(/(?<!")\n(?!")/g, '\\n')); 
        admin.initializeApp({
          credential: admin.credential.cert(sa),
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET
        });
      }
    } else {
      throw new Error('Service account file missing');
    }
  } catch (error) {
    console.error('❌ Firebase Admin initialization error:', error);
    
    // Fallback to Env Vars
    try {
      console.log('Attempting fallback to environment variables...');
      const pKey = process.env.FIREBASE_PRIVATE_KEY;
      if (pKey) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: pKey.replace(/\\n/g, '\n'),
          }),
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET
        });
        console.log('✅ Firebase Admin initialized via Env Vars');
      } else {
        throw new Error('No private key in env');
      }
    } catch (fallbackError) {
      console.warn('⚠️ Fallback also failed. Initializing in mock mode.');
      admin.initializeApp({
        projectId: 'mock-project-id'
      });
    }
  }
}

const db = admin.firestore();
const auth = admin.auth();
let bucket;
try {
  bucket = admin.storage().bucket();
} catch (e) {
  console.warn('⚠️ Storage bucket not initialized');
}

module.exports = { db, auth, bucket };
