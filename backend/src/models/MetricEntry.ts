import mongoose, { Schema, Document } from 'mongoose';

export interface IMetricEntry extends Document {
  dailyLogId: mongoose.Types.ObjectId;
  metricId: mongoose.Types.ObjectId;
  value: string; // Encrypted
}

const MetricEntrySchema: Schema = new Schema({
  dailyLogId: { type: Schema.Types.ObjectId, ref: 'DailyLog', required: true },
  metricId: { type: Schema.Types.ObjectId, ref: 'Metric', required: true },
  value: { type: String, required: true }, // Store encrypted
});

export default mongoose.model<IMetricEntry>('MetricEntry', MetricEntrySchema);
