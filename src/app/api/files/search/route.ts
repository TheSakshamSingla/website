import { NextRequest, NextResponse } from 'next/server';
import File from '@/lib/db/models/file';
import clientPromise from '@/lib/db/mongodb';

// This is required for static export
export const dynamic = "force-static";
export const revalidate = false;

// Mock data for static export
const mockFiles = [
  {
    _id: '1',
    name: 'Magisk Module Collection',
    description: 'A comprehensive collection of the most popular Magisk modules for enhanced functionality.',
    type: 'module',
    category: 'utilities',
    tags: ['magisk', 'root', 'collection'],
    downloadCount: 15243,
    version: '2.1.0',
    author: {
      _id: '1',
      name: 'Admin User',
      image: '/images/avatar-1.jpg'
    },
    createdAt: '2023-01-15T08:30:00.000Z',
    updatedAt: '2023-04-22T14:15:00.000Z'
  },
  {
    _id: '2',
    name: 'Battery Optimizer Pro',
    description: 'Extend your battery life by up to 40% with this advanced optimization module.',
    type: 'module',
    category: 'performance',
    tags: ['battery', 'optimization', 'performance'],
    downloadCount: 8765,
    version: '3.0.2',
    author: {
      _id: '1',
      name: 'Admin User',
      image: '/images/avatar-1.jpg'
    },
    createdAt: '2023-02-10T10:45:00.000Z',
    updatedAt: '2023-05-05T09:20:00.000Z'
  },
  {
    _id: '3',
    name: 'Performance Booster',
    description: 'Unlock hidden performance settings and boost your device\'s speed significantly.',
    type: 'script',
    category: 'performance',
    tags: ['performance', 'speed', 'optimization'],
    downloadCount: 12098,
    version: '1.5.1',
    author: {
      _id: '1',
      name: 'Admin User',
      image: '/images/avatar-1.jpg'
    },
    createdAt: '2023-03-05T15:20:00.000Z',
    updatedAt: '2023-06-12T11:30:00.000Z'
  }
];

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('MongoDB URI not found, using mock data');
      return null;
    }
    
    const client = await clientPromise;
    const db = client.db('root-things');
    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    return null;
  }
};

export async function GET(req: NextRequest) {
  try {
    // Get search parameters from URL
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('query') || '';
    const type = searchParams.get('type') || '';
    const category = searchParams.get('category') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Connect to MongoDB
    const db = await connectDB();
    
    let files = [];
    let totalFiles = 0;
    
    if (db) {
      // Build the search filter
      const filter: any = {};
      
      // Add text search if query is provided
      if (query) {
        filter.$text = { $search: query };
      }
      
      // Add type filter if provided
      if (type && ['module', 'script', 'kernel'].includes(type)) {
        filter.type = type;
      }
      
      // Add category filter if provided
      if (category) {
        filter.category = category;
      }

      // Calculate pagination
      const skip = (page - 1) * limit;

      // Build the sort object
      const sort: any = {};
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

      // If using text search, add the text score to the sort
      if (query) {
        sort.score = { $meta: 'textScore' };
      }

      // Execute the search query
      files = await File.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('author', 'name image')
        .lean();

      // Get total count for pagination
      totalFiles = await File.countDocuments(filter);
    } else {
      // Use mock data for static export
      files = [...mockFiles];
      
      // Apply filters to mock data
      if (query) {
        files = files.filter(file => 
          file.name.toLowerCase().includes(query.toLowerCase()) || 
          file.description.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      if (type) {
        files = files.filter(file => file.type === type);
      }
      
      if (category) {
        files = files.filter(file => file.category === category);
      }
      
      // Sort mock data
      files.sort((a, b) => {
        if (sortBy === 'createdAt') {
          return sortOrder === 'asc' 
            ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        
        if (sortBy === 'downloadCount') {
          return sortOrder === 'asc' 
            ? a.downloadCount - b.downloadCount
            : b.downloadCount - a.downloadCount;
        }
        
        return 0;
      });
      
      totalFiles = files.length;
      
      // Apply pagination to mock data
      const skip = (page - 1) * limit;
      files = files.slice(skip, skip + limit);
    }
    
    const totalPages = Math.ceil(totalFiles / limit);

    return NextResponse.json({
      success: true,
      files,
      pagination: {
        page,
        limit,
        totalFiles,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Error searching files:', error);
    return NextResponse.json({ error: 'Failed to search files' }, { status: 500 });
  }
}
