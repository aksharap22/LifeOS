import type { Request, Response } from 'express';
import { isDbConnected } from '../config/db.js';
import Experiment from '../models/Experiment.js';
import Metric from '../models/Metric.js';
import { getExperimentAnalytics } from '../services/analytics.js';

export const getExperimentResults = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!isDbConnected()) {
      return res.status(503).json({ message: 'Database not connected.' });
    }
    const analytics = await getExperimentAnalytics(id as string);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics' });
  }
};

export const getExperimentById = async (req: Request, res: Response) => {
  const id = req.params['id'];

  if (!id) {
    return res.status(400).json({ message: 'Experiment id is required' });
  }

  try {
    if (!isDbConnected()) {
      return res.status(503).json({ message: 'Database not connected.' });
    }
    const experiment = await Experiment.findOne({
      _id: id,
      userId: (req as any).user._id,
    });

    if (!experiment) {
      return res.status(404).json({ message: 'Experiment not found' });
    }

    const metrics = await Metric.find({ experimentId: experiment._id });
    res.json({ experiment, metrics });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experiment' });
  }
};

export const createExperiment = async (req: Request, res: Response) => {
  const { title, description, hypothesis, category, duration, metrics } = req.body;

  try {
    if (!isDbConnected()) {
      return res.status(503).json({ message: 'Database not connected.' });
    }
    const experiment = await Experiment.create({
      userId: (req as any).user._id,
      title,
      description,
      hypothesis,
      category,
      duration,
      status: 'Active',
      startDate: new Date(),
      endDate: new Date(Date.now() + Number(duration) * 24 * 60 * 60 * 1000),
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
    console.error('Error creating experiment:', error);
    res.status(500).json({ message: 'Error creating experiment', error: error instanceof Error ? error.message : String(error) });
  }
};

export const deleteExperiment = async (req: Request, res: Response) => {
  console.log(`Delete request received for ID: ${req.params.id}`);
  try {
    if (!isDbConnected()) {
      return res.status(503).json({ message: 'Database not connected.' });
    }
    const experiment = await Experiment.findOneAndDelete({
      _id: req.params.id,
      userId: (req as any).user._id,
    });
    if (!experiment) {
      console.log(`Experiment ${req.params.id} not found for user`);
      return res.status(404).json({ message: 'Experiment not found' });
    }
    await Metric.deleteMany({ experimentId: req.params.id });
    res.json({ message: 'Experiment deleted' });
  } catch (error) {
    console.error('Error deleting experiment:', error);
    res.status(500).json({ message: 'Error deleting experiment' });
  }
};

export const getExperiments = async (req: Request, res: Response) => {
  try {
    const experiments = await Experiment.find({ userId: (req as any).user._id }).sort({ createdAt: -1 });
    res.json(experiments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experiments' });
  }
};

