import { Storage } from '@google-cloud/storage';

const keyFilename = process.env.GCS_KEY_FILENAME;
const outputBucket = process.env.GCS_OUTPUT_BUCKET_NAME;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get('file');
  if (!file) return Response.json({ error: 'Missing file param' }, { status: 400 });

  const storage = new Storage({ keyFilename });
  const fileRef = storage.bucket(outputBucket!).file(file);

  const [exists] = await fileRef.exists();
  if (!exists) return Response.json({ exists: false }, { status: 404 });

  const [url] = await fileRef.getSignedUrl({
    action: 'read',
    expires: Date.now() + 10 * 60 * 1000,
  });

  return Response.json({ exists: true, url });
}