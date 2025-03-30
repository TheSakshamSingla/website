import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFile extends Document {
  name: string;
  description: string;
  type: 'module' | 'script' | 'kernel';
  category: string;
  tags: string[];
  url: string;
  size: number;
  downloadCount: number;
  author: mongoose.Types.ObjectId;
  image?: string;
  version: string;
  compatibility: string[];
  createdAt: Date;
  updatedAt: Date;
}

const FileSchema = new Schema<IFile>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['module', 'script', 'kernel'], required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    url: { type: String, required: true },
    size: { type: Number, required: true },
    downloadCount: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: { type: String },
    version: { type: String, required: true },
    compatibility: [{ type: String }],
  },
  { timestamps: true }
);

// Create indexes for better search performance
FileSchema.index({ name: 'text', description: 'text', tags: 'text' });
FileSchema.index({ type: 1, category: 1 });
FileSchema.index({ downloadCount: -1 });

// This is to prevent mongoose from creating a new model every time this file is imported
const File = (mongoose.models.File as Model<IFile>) || mongoose.model<IFile>('File', FileSchema);

export default File;
