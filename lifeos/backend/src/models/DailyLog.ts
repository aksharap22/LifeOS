import mongoose, { Schema, Document } from 'mongoose';

export interface IDailyLog extends Document {
  userId: mongoose.Types.ObjectId;
  experimentId: mongoose.Types.ObjectId;
  date: Date;
  notes?: string;
}

const DailyLogSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  experimentId: { type: Schema.Types.ObjectId, ref: 'Experiment', required: true },
  date: { type: Date, required: true },
  notes: { type: String },
});

export default mongoose.model<IDailyLog>('DailyLog', DailyLogSchema);
