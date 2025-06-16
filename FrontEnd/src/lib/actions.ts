'use server';

import { Storage } from '@google-cloud/storage';
import { UploadToGcs } from '@/lib/storage';
import { generateFileName } from '@/lib/generateFileName';

const keyFilename = process.env.GCS_KEY_FILENAME;
const bucketName = process.env.GCS_BUCKET_NAME;
const maxDimension = Number(process.env.MAX_IMAGE_DIMENSION) || 4000;
const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

export const UploadFile = async (
  prevState: { fileName?: string; error?: string },
  form: FormData
) => {
  try {
    const file = form.get('file') as File;
    const width = Number(form.get('width'));
    const height = Number(form.get('height'));
    if (!file) throw new Error('No file provided');
    if (!width || !height) throw new Error('Largura e altura são obrigatórias');
    if (width > maxDimension || height > maxDimension) {
      throw new Error(`Largura e altura não podem ser maiores que ${maxDimension}px`);
    }

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Tipo de arquivo não permitido. Envie JPG, JPEG, PNG ou GIF.');
    }

    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !allowedExtensions.includes(ext)) {
      throw new Error('Extensão de arquivo não permitida.');
    }

    const prefix = `${width}x${height}`;
    const fileName = generateFileName(file.name, prefix);
    const renamedFile = new File([await file.arrayBuffer()], fileName, { type: file.type });
    await UploadToGcs(renamedFile);
    return { fileName };
  } catch (error) {
    console.error(error);
    return { error: (error as Error).message || 'Erro ao fazer upload' };
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
