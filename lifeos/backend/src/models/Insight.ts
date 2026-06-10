import mongoose, { Schema, Document } from 'mongoose';

export interface IInsight extends Document {
  experimentId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  confidenceScore: number;
}

const InsightSchema: Schema = new Schema({
  experimentId: { type: Schema.Types.ObjectId, ref: 'Experiment', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  confidenceScore: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IInsight>('Insight', InsightSchema);
