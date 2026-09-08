import dns from 'node:dns';
import mongoose from 'mongoose';
import { env } from './env.js';

// Windows / some ISP resolvers fail `mongodb+srv` SRV lookups (querySrv ECONNREFUSED).
dns.setServers(['8.8.8.8', '1.1.1.1']);

export async function connectDatabase(): Promise<boolean> {
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(env.MONGODB_URI, {
      dbName: 'codexnova',
      serverSelectionTimeoutMS: 15_000,
    });
    console.log('MongoDB connected');
    return true;
  } catch (error) {
    console.warn(
      'MongoDB unavailable — API will still run. Form leads will be saved to Google Sheets.',
      error instanceof Error ? error.message : error,
    );
    return false;
  }
}

export function isDatabaseConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
