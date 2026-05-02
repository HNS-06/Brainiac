const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documents');
const ragRoutes = require('./routes/rag');
const agentRoutes = require('./routes/agents');
const insightRoutes = require('./routes/insights');

app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/rag', ragRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/insights', insightRoutes);

app.get('/', (req, res) => {
  res.send('Brainiac Backend API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
