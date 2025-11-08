import { readFileSync } from 'fs';

const BUCKET_ID = process.env.DEFAULT_OBJECT_STORAGE_BUCKET_ID;
const filePath = process.argv[2];
const destinationPath = process.argv[3];

if (!BUCKET_ID) {
  console.error('DEFAULT_OBJECT_STORAGE_BUCKET_ID not found');
  process.exit(1);
}

if (!filePath || !destinationPath) {
  console.error('Usage: tsx upload-to-storage.ts <file-path> <destination-path>');
  process.exit(1);
}

async function uploadFile() {
  try {
    const fileBuffer = readFileSync(filePath);
    
    const response = await fetch(
      `https://storage.googleapis.com/upload/storage/v1/b/${BUCKET_ID}/o?uploadType=media&name=${encodeURIComponent(destinationPath)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'audio/mpeg',
        },
        body: fileBuffer,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    const publicUrl = `https://storage.googleapis.com/${BUCKET_ID}/${destinationPath}`;
    
    console.log('File uploaded successfully!');
    console.log('Public URL:', publicUrl);
    
    return publicUrl;
  } catch (error) {
    console.error('Upload failed:', error);
    process.exit(1);
  }
}

uploadFile();
