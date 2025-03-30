import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { getSignedDownloadUrl } from '@/lib/storage/r2';
import File from '@/lib/db/models/file';
import User from '@/lib/db/models/user';
import mongoose from 'mongoose';
import clientPromise from '@/lib/db/mongodb';

// This is required for static export
export const dynamic = "force-static";
export const revalidate = false;

// Generate static paths for build time
export async function generateStaticParams() {
  return [{ id: 'placeholder' }];
}

// Connect to MongoDB
const connectDB = async () => {
  const client = await clientPromise;
  const db = client.db('root-things');
  return { client, db };
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fileId = params.id;
    
    if (!fileId || !mongoose.Types.ObjectId.isValid(fileId)) {
      return NextResponse.json({ error: 'Invalid file ID' }, { status: 400 });
    }

    // Connect to MongoDB
    await connectDB();

    // Find the file in the database
    const file = await File.findById(fileId);
    
    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Extract the key from the URL
    const urlParts = file.url.split('/');
    const key = urlParts.slice(3).join('/');

    // Generate a signed URL for downloading the file
    const downloadUrl = await getSignedDownloadUrl(key);

    // Increment the download count
    file.downloadCount += 1;
    await file.save();

    // If user is authenticated, add this file to their downloads
    const session = await auth(authOptions);
    if (session && session.user && session.user.id) {
      const user = await User.findById(session.user.id);
      if (user) {
        // Check if the file is already in the user's downloads
        const fileIdString = file._id.toString();
        const hasDownloaded = user.downloads.some(id => id.toString() === fileIdString);
        
        if (!hasDownloaded) {
          user.downloads.push(file._id);
          await user.save();
        }
      }
    }

    return NextResponse.json({
      success: true,
      downloadUrl,
      file: {
        id: file._id,
        name: file.name,
        description: file.description,
        type: file.type,
        downloadCount: file.downloadCount,
        version: file.version,
      }
    });
  } catch (error) {
    console.error('Error generating download URL:', error);
    return NextResponse.json({ error: 'Failed to generate download URL' }, { status: 500 });
  }
}
