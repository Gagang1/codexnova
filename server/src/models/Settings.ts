import mongoose, { Schema } from 'mongoose';

const settingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    value: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true },
);

export const Settings = mongoose.model('Settings', settingsSchema);
