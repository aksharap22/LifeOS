import type { Request, Response } from 'express';
import Experiment from '../models/Experiment.js';
import Metric from '../models/Metric.js';
import { getExperimentAnalytics } from '../services/analytics.js';

export const getExperimentResults = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const analytics = await getExperimentAnalytics(id as string);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics' });
  }
};

export const createExperiment = async (req: Request, res: Response) => {
  const { title, description, hypothesis, category, duration, metrics } = req.body;

  try {
    const experiment = await Experiment.create({
      userId: (req as any).user._id,
      title,
      description,
      hypothesis,
      category,
      duration,
      status: 'Active',
      startDate: new Date(),
    });

    if (metrics && metrics.length > 0) {
      const metricDocs = metrics.map((m: any) => ({
        ...m,
        experimentId: experiment._id,
      }));
      await Metric.insertMany(metricDocs);
    }

    res.status(201).json(experiment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating experiment' });
  }
};

export const getExperiments = async (req: Request, res: Response) => {
  try {
    const experiments = await Experiment.find({ userId: (req as any).user._id });
    res.json(experiments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experiments' });
  }
};
