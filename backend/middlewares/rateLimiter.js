const rateLimit = require('express-rate-limit');

/**
 * Standard API rate limiter
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Too many requests, please try again later.'
  }
});

/**
 * Stricter limiter for AI/RAG operations (to save costs/resources)
 */
const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50,
  message: {
    error: 'AI usage limit reached for this hour.'
  }
});

module.exports = { apiLimiter, aiLimiter };
