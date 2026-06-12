import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String }, // Made optional as Google users won't have it
    googleId: { type: String }, // Added field
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>('User', UserSchema);
