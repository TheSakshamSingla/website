import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  bio?: string;
  githubId?: string;
  role: 'user' | 'admin';
  favorites: mongoose.Types.ObjectId[];
  downloads: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    bio: { type: String },
    githubId: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'File' }],
    downloads: [{ type: Schema.Types.ObjectId, ref: 'File' }],
  },
  { timestamps: true }
);

// This is to prevent mongoose from creating a new model every time this file is imported
const User = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);

export default User;
