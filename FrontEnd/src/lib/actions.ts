'use server';

import { Storage } from '@google-cloud/storage';
import { UploadToGcs } from '@/lib/storage';

const keyFilename = process.env.GCS_KEY_FILENAME;
const bucketName = process.env.GCS_BUCKET_NAME;

export const UploadFile = async (form: FormData) => {
  try {
    const file = form.get('file') as File;
    await UploadToGcs(file);
  } catch (error) {
    console.error(error);
  }
}

export const GetSignedUrl = async (fileName: string) => {
  const storage = new Storage({ keyFilename });

  const [url] = await storage.bucket(bucketName!)
    .file(fileName)
    .getSignedUrl(
      {
        action: 'write',
        version: 'v4',
        expires: Date.now() + 15 * 60 * 1000,
        contentType: 'application/octet-stream',
      }
    );

  return url;
}
