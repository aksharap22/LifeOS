import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { registerUser, loginUser } from './api/auth.js';
import { createExperiment, getExperimentById, getExperiments, getExperimentResults } from './api/experiments.js';
import { createDailyLog, getDailyLogs } from './api/metrics.js';
import { triggerAIAnalysis } from './api/ai.js';
import { getOperatingManual } from './api/manual.js';
import { protect } from './middleware/auth.js';
import mongoose from 'mongoose';

dotenv.config();

mongoose.set('bufferCommands', false);

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

const startServer = async () => {
  try {
    await connectDB();

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.get('/', (req, res) => {
      res.send('LifeOS API is running...');
    });

    // Auth
    app.post('/api/v1/auth/register', registerUser);
    app.post('/api/v1/auth/login', loginUser);

    // Experiments
    app.post('/api/v1/experiments', protect, createExperiment);
    app.get('/api/v1/experiments', protect, getExperiments);
    app.get('/api/v1/experiments/:id', protect, getExperimentById);
    app.get('/api/v1/experiments/:id/results', protect, getExperimentResults);

    // Metrics/Logs
    app.post('/api/v1/logs', protect, createDailyLog);
    app.get('/api/v1/logs', protect, getDailyLogs);

    // AI & Manual
    app.post('/api/v1/ai/generate/:experimentId', protect, triggerAIAnalysis);
    app.get('/api/v1/manual', protect, getOperatingManual);

    const PORT = process.env.PORT || 5001;

    app.listen(PORT as number, '0.0.0.0', () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
