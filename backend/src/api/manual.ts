import type { Request, Response } from 'express';
import OperatingManual from '../models/OperatingManual.js';

export const getOperatingManual = async (req: Request, res: Response) => {
  try {
    let manual = await OperatingManual.findOne({ userId: (req as any).user._id });
    if (!manual) {
      manual = await OperatingManual.create({
        userId: (req as any).user._id,
        summary: 'No insights generated yet. Complete more experiments!',
        recommendations: []
      });
    }
    res.json(manual);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching manual' });
  }
};
