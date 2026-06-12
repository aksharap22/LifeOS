import mongoose, { Schema, Document } from 'mongoose';

export interface IExperiment extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  hypothesis: string;
  category: string;
  duration: number;
  status: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

const ExperimentSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    hypothesis: { type: String, required: true },
    category: {
      type: String,
      enum: ['Productivity', 'Health', 'Sleep', 'Social', 'Emotional', 'Attention', 'Growth', 'Custom', 'Lifestyle', 'Behavioral'],
      default: 'Custom',
    },
    duration: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Draft', 'Active', 'Completed', 'Cancelled'],
      default: 'Draft',
    },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IExperiment>('Experiment', ExperimentSchema);
