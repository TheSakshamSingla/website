import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize the S3 client with Cloudflare R2 credentials
const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '',
  },
});

const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'root-things';

// Get the base URL for the application (GitHub Pages or custom domain)
const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    // Use NEXT_PUBLIC_BASE_URL for GitHub Pages or custom domain when set
    return process.env.NEXT_PUBLIC_SITE_URL || 
           `https://${process.env.VERCEL_URL}` || 
           `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io/${process.env.NEXT_PUBLIC_BASE_URL || ''}`;
  }
  return 'http://localhost:3000';
};

/**
 * Upload a file to Cloudflare R2 storage
 * @param file The file to upload
 * @param key The key (path) to store the file under
 * @returns The URL of the uploaded file
 */
export async function uploadFile(file: Buffer, key: string, contentType: string): Promise<string> {
  try {
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: bucketName,
        Key: key,
        Body: file,
        ContentType: contentType,
      },
    });

    await upload.done();
    
    // Generate a URL for the uploaded file
    return `${getBaseUrl()}/api/files/${encodeURIComponent(key)}`;
  } catch (error) {
    console.error('Error uploading file to R2:', error);
    throw new Error('Failed to upload file');
  }
}

/**
 * Generate a signed URL for downloading a file
 * @param key The key (path) of the file
 * @param expiresIn Expiration time in seconds (default: 3600)
 * @returns A signed URL for downloading the file
 */
export async function getSignedDownloadUrl(key: string, expiresIn = 3600): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    return await getSignedUrl(s3Client, command, { expiresIn });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw new Error('Failed to generate download URL');
  }
}

/**
 * Generate a signed URL for uploading a file
 * @param key The key (path) to store the file under
 * @param contentType The content type of the file
 * @param expiresIn Expiration time in seconds (default: 3600)
 * @returns A signed URL for uploading the file
 */
export async function getSignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn = 3600
): Promise<string> {
  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: contentType,
    });

    return await getSignedUrl(s3Client, command, { expiresIn });
  } catch (error) {
    console.error('Error generating signed upload URL:', error);
    throw new Error('Failed to generate upload URL');
  }
}

/**
 * Delete a file from Cloudflare R2 storage
 * @param key The key (path) of the file to delete
 */
export async function deleteFile(key: string): Promise<void> {
  try {
    await s3Client.send({
      Bucket: bucketName,
      Key: key,
    });
  } catch (error) {
    console.error('Error deleting file from R2:', error);
    throw new Error('Failed to delete file');
  }
}
