export function generateFileName(originalName: string, prefix = "upload") {
  const ext = originalName.substring(originalName.lastIndexOf('.'));
  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
  return `${prefix}_${timestamp}${ext}`;
}