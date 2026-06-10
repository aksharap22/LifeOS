import type { Request, Response } from 'express';
import { generateAIInsights } from '../services/ai.js';
import { getExperimentAnalytics } from '../services/analytics.js';

export const triggerAIAnalysis = async (req: Request, res: Response) => {
  const { experimentId } = req.params;
  try {
    const data = await getExperimentAnalytics(experimentId as string);
    const insight = await generateAIInsights(experimentId as string, data);
    res.json(insight);
  } catch (error) {
    res.status(500).json({ message: 'Error generating AI insights' });
  }
};
