import { UploadToGcs } from '@/lib/storage';

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get('file') as File;
  const success = await UploadToGcs(file);

  return Response.json({success: success});
}