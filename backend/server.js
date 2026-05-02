const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { apiLimiter } = require('./middlewares/rateLimiter');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middlewares
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:3001'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(apiLimiter); // Apply global rate limiting

// Root & Health Check
app.get('/', (req, res) => {
  res.json({ message: 'Brainiac Production Backend is online 🚀', status: 'healthy' });
});

// Routes
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documents');
const ragRoutes = require('./routes/rag');
const agentRoutes = require('./routes/agents');
const insightRoutes = require('./routes/insights');
const dashboardRoutes = require('./routes/dashboard');
const historyRoutes = require('./routes/history');
const userRoutes = require('./routes/user');

app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/rag', ragRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/insights', insightRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/user', userRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error('SERVER_ERROR:', err.message);
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Brainiac Production Backend running on port ${PORT}`);
});
