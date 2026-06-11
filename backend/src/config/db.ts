import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/lifeos';
    console.log(`Attempting to connect to MongoDB at: ${uri.split('@')[1] || uri}`);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error detail:', error);
    // Don't exit immediately, let the caller decide or at least see the full error
    throw error;
  }
};

export default connectDB;
