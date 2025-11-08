import { Storage } from '@google-cloud/storage';
import { basename } from 'path';

const BUCKET_ID = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID;

if (!BUCKET_ID) {
  console.error('DEFAULT_OBJECT_STORAGE_BUCKET_ID not set');
  process.exit(1);
}

const filePath = process.argv[2];
const destination = process.argv[3] || `public/${basename(filePath)}`;

if (!filePath) {
  console.error('Usage: tsx upload-audio.ts <file-path> [destination-path]');
  process.exit(1);
}

async function upload() {
  try {
    const storage = new Storage({
      projectId: 'replit',
    });
    const bucket = storage.bucket(BUCKET_ID);
    
    const [file] = await bucket.upload(filePath, {
      destination,
      public: true,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });

    await file.makePublic();

    const publicUrl = `https://storage.googleapis.com/${BUCKET_ID}/${destination}`;
    console.log('✓ File uploaded successfully!');
    console.log('Public URL:', publicUrl);
    
    return publicUrl;
  } catch (error: any) {
    console.error('Upload failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
}

upload();
