import type { Request, Response } from 'express';
import { isDbConnected } from '../config/db.js';
import DailyLog from '../models/DailyLog.js';
import MetricEntry from '../models/MetricEntry.js';

export const createDailyLog = async (req: Request, res: Response) => {
  const { experimentId, date, notes, entries } = req.body;

  try {
    if (!isDbConnected()) {
      return res.status(503).json({ message: 'Database not connected.' });
    }

    const dailyLog = await DailyLog.create({
      userId: (req as any).user._id,
      experimentId,
      date: new Date(date),
      notes,
    });

    if (entries && entries.length > 0) {
      const entryDocs = entries.map((e: any) => ({
        ...e,
        dailyLogId: dailyLog._id,
      }));
      await MetricEntry.insertMany(entryDocs);
    }

    res.status(201).json(dailyLog);
  } catch (error) {
    console.error('Error in createDailyLog:', error);
    res.status(500).json({ message: 'Error creating daily log', error: error instanceof Error ? error.message : String(error) });
  }
};

export const getDailyLogs = async (req: Request, res: Response) => {
  const { experimentId } = req.query;

  try {
    const query: any = { userId: (req as any).user._id };
    if (experimentId) {
      query.experimentId = experimentId as string;
    }

    const logs = await DailyLog.find(query)
      .populate('experimentId', 'title')
      .sort({ date: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching daily logs' });
  }
};
