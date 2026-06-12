import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless-http';
import connectDB from './config/db.js';
import { registerUser, loginUser } from './api/auth.js';
import { createExperiment, getExperimentById, getExperiments, getExperimentResults, deleteExperiment } from './api/experiments.js';
import { createDailyLog, getDailyLogs } from './api/metrics.js';
import { triggerAIAnalysis } from './api/ai.js';
import { getOperatingManual } from './api/manual.js';
import { protect } from './middleware/auth.js';
import mongoose from 'mongoose';

dotenv.config();

mongoose.set('bufferCommands', false);

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Initialize DB
connectDB().catch(console.error);

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
app.delete('/api/v1/experiments/:id', protect, deleteExperiment);

// Metrics/Logs
app.post('/api/v1/logs', protect, createDailyLog);
app.get('/api/v1/logs', protect, getDailyLogs);

// AI & Manual
app.post('/api/v1/ai/generate/:experimentId', protect, triggerAIAnalysis);
app.get('/api/v1/manual', protect, getOperatingManual);

const PORT = Number(process.env.PORT) || 10000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
