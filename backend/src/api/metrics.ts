import type { Request, Response } from 'express';
import DailyLog from '../models/DailyLog.js';
import MetricEntry from '../models/MetricEntry.js';

export const createDailyLog = async (req: Request, res: Response) => {
  const { experimentId, date, notes, entries } = req.body;

  try {
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
    res.status(500).json({ message: 'Error creating daily log' });
  }
};

export const getDailyLogs = async (req: Request, res: Response) => {
  const { experimentId } = req.query;

  try {
    const logs = await DailyLog.find({
      userId: (req as any).user._id,
      experimentId: experimentId as string,
    }).sort({ date: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching daily logs' });
  }
};
