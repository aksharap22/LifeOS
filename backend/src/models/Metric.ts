import mongoose, { Schema, Document } from 'mongoose';

export interface IMetric extends Document {
  experimentId: mongoose.Types.ObjectId;
  name: string;
  type: string;
  unit?: string;
}

const MetricSchema: Schema = new Schema({
  experimentId: { type: Schema.Types.ObjectId, ref: 'Experiment', required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['Numeric', 'Boolean', 'Rating Scale', 'Duration', 'Percentage', 'Text'],
    required: true,
  },
  unit: { type: String },
});

export default mongoose.model<IMetric>('Metric', MetricSchema);
