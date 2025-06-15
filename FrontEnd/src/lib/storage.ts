import { Storage } from '@google-cloud/storage';

const keyFilename = process.env.GCS_KEY_FILENAME;
const bucketName = process.env.GCS_BUCKET_NAME;

export const UploadToGcs = async (file: File) => {
  if (!file) throw new Error('No file provided');
  if (file.size < 1) throw new Error('File is empty');

  const buffer = await file.arrayBuffer();
  const storage = new Storage({ keyFilename });
  await storage.bucket(bucketName!).file(file.name).save(Buffer.from(buffer));

  return true;
}
