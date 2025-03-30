import { NextRequest, NextResponse } from 'next/server';
import { getSignedDownloadUrl } from '@/lib/storage/r2';

// This is required for static export
export const dynamic = "force-static";
export const revalidate = false;

// Generate static paths for build time
export async function generateStaticParams() {
  return [{ key: 'placeholder' }];
}

export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const key = decodeURIComponent(params.key);
    
    // Generate a signed URL for the file
    const signedUrl = await getSignedDownloadUrl(key);
    
    // Redirect to the signed URL
    return NextResponse.redirect(signedUrl);
  } catch (error) {
    console.error('Error accessing file:', error);
    return NextResponse.json(
      { error: 'Failed to access file' },
      { status: 500 }
    );
  }
}
