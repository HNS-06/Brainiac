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
  origin: true, // Allow all origins for debugging
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(apiLimiter); // Temporarily disabled for debugging

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
app.use('/api/user', userRoutes);
app.use('/api/history', historyRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', insightRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error('SERVER_ERROR:', err.message);
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Brainiac Production Backend running on http://localhost:${PORT}`);
  console.log(`📡 Heartbeat: Models and Routes initialized at ${new Date().toLocaleTimeString()}`);
});
