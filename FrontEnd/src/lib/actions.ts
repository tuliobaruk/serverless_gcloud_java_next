'use server';

import { Storage } from '@google-cloud/storage';
import { UploadToGcs } from '@/lib/storage';
import { generateFileName } from '@/lib/generateFileName';

const keyFilename = process.env.GCS_KEY_FILENAME;
const bucketName = process.env.GCS_BUCKET_NAME;

export const UploadFile = async (
  prevState: { fileName?: string; error?: string },
  form: FormData
) => {
  try {
    const file = form.get('file') as File;
    if (!file) throw new Error('No file provided');
    const fileName = generateFileName(file.name);
    const renamedFile = new File([await file.arrayBuffer()], fileName, { type: file.type });
    await UploadToGcs(renamedFile);
    return { fileName };
  } catch (error) {
    console.error(error);
    return { error: 'Erro ao fazer upload' };
  }
};

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
