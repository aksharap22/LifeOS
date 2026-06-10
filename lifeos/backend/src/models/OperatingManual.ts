import mongoose, { Schema, Document } from 'mongoose';

export interface IOperatingManual extends Document {
  userId: mongoose.Types.ObjectId;
  summary: string;
  recommendations: any[];
  confidenceLevel: number;
}

const OperatingManualSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  summary: { type: String },
  recommendations: { type: Array, default: [] },
  confidenceLevel: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IOperatingManual>('OperatingManual', OperatingManualSchema);
