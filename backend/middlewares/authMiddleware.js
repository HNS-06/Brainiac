const { auth } = require('../utils/firebase');

/**
 * Middleware to verify Firebase Auth ID Token
 */
async function verifyAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(403).json({ error: 'Unauthorized: Invalid token' });
  }
}

module.exports = { verifyAuth };
