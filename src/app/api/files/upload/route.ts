import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/app/auth';
import { v4 as uuidv4 } from 'uuid';
import { authOptions } from '../../auth/[...nextauth]/route';
import { uploadFile } from '@/lib/storage/r2';
import File from '@/lib/db/models/file';
import mongoose from 'mongoose';
import clientPromise from '@/lib/db/mongodb';

// This is required for static export
export const dynamic = "force-static";
export const revalidate = false;

// Connect to MongoDB
const connectDB = async () => {
  const client = await clientPromise;
  const db = client.db('root-things');
  return { client, db };
};

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse the form data
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Get file details from form
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const type = formData.get('type') as 'module' | 'script' | 'kernel';
    const category = formData.get('category') as string;
    const tags = (formData.get('tags') as string).split(',').map(tag => tag.trim());
    const version = formData.get('version') as string;
    const compatibility = (formData.get('compatibility') as string).split(',').map(item => item.trim());
    const image = formData.get('image') as File || null;

    // Validate required fields
    if (!name || !description || !type || !category || !version) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Convert file to buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileSize = fileBuffer.length;
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `files/${type}/${fileName}`;

    // Upload file to Cloudflare R2
    const fileUrl = await uploadFile(fileBuffer, filePath, file.type);

    // Upload image if provided
    let imageUrl = '';
    if (image) {
      const imageBuffer = Buffer.from(await image.arrayBuffer());
      const imageExtension = image.name.split('.').pop();
      const imageName = `${uuidv4()}.${imageExtension}`;
      const imagePath = `images/${type}/${imageName}`;
      imageUrl = await uploadFile(imageBuffer, imagePath, image.type);
    }

    // Connect to MongoDB
    await connectDB();

    // Create a new file record in the database
    const newFile = new File({
      name,
      description,
      type,
      category,
      tags,
      url: fileUrl,
      size: fileSize,
      downloadCount: 0,
      author: session.user.id,
      image: imageUrl || undefined,
      version,
      compatibility,
    });

    await newFile.save();

    return NextResponse.json({
      success: true,
      file: {
        id: newFile._id,
        name: newFile.name,
        url: newFile.url,
      }
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
