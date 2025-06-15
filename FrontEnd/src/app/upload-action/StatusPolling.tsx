'use client';
import React, { useEffect, useState } from 'react';

export function StatusPolling({ fileName }: { fileName: string }) {
  const [status, setStatus] = useState<'processing' | 'done' | 'error'>('processing');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    async function poll() {
      const res = await fetch(`/api/status?file=${encodeURIComponent(fileName)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          setDownloadUrl(data.url);
          setStatus('done');
          clearInterval(interval);
        }
      }
    }
    interval = setInterval(poll, 2000);
    poll();
    return () => clearInterval(interval);
  }, [fileName]);

  if (status === 'processing') {
    return (
      <div className="text-center mt-4 text-yellow-600 font-semibold flex flex-col items-center gap-2">
        <span>Processando...</span>
        <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-600"></span>
      </div>
    );
  }
  if (status === 'done' && downloadUrl) {
    return (
      <div className="text-center mt-4">
        <a href={downloadUrl} target="_blank" rel="noopener" className="text-green-600 underline font-semibold">
          Download do arquivo processado
        </a>
      </div>
    );
  }
  return null;
}