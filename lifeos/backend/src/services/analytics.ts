import MetricEntry from '../models/MetricEntry.js';
import DailyLog from '../models/DailyLog.js';

export const getExperimentAnalytics = async (experimentId: string) => {
  const logs = await DailyLog.find({ experimentId }).sort({ date: 1 });
  const logIds = logs.map((l: any) => l._id);
  
  const entries = await MetricEntry.find({ dailyLogId: { $in: logIds } });

  // Group entries by metric and date for Recharts
  const dataMap: any = {};
  
  logs.forEach((log: any) => {
    const dateStr = log.date.toISOString().split('T')[0];
    if (!dataMap[dateStr]) dataMap[dateStr] = { date: dateStr };
    
    const logEntries = entries.filter((e: any) => e.dailyLogId.toString() === log._id.toString());
    logEntries.forEach((entry: any) => {
      dataMap[dateStr][entry.metricId.toString()] = Number(entry.value);
    });
  });

  return Object.values(dataMap);
};
