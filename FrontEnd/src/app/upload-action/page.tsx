'use client';
import React, { useActionState, useState } from 'react';
import { UploadFile } from '@/lib/actions';
import { StatusPolling } from './StatusPolling';

type UploadState = {
  fileName?: string;
  error?: string;
};

const initialState: UploadState = {};

export default function FileUpload() {
  const [state, formAction] = useActionState<UploadState, FormData>(UploadFile, initialState);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-[#232326] dark:to-[#18181b]">
      <div className="w-full max-w-lg bg-white dark:bg-[#232326] rounded-2xl shadow-xl p-10">
        <h1 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-300 mb-8">
          Upload de Imagem Serverless
        </h1>
        <form
          action={formAction}
          className="flex flex-col gap-6"
        >
          <input
            type="file"
            name="file"
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
          <div className="flex gap-4">
            <input
              type="number"
              name="width"
              placeholder="Largura"
              min={1}
              value={width}
              onChange={e => setWidth(e.target.value)}
              className="w-1/2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200"
              required
            />
            <input
              type="number"
              name="height"
              placeholder="Altura"
              min={1}
              value={height}
              onChange={e => setHeight(e.target.value)}
              className="w-1/2 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow font-semibold transition"
          >
            Enviar arquivo
          </button>
        </form>
        {state.fileName && (
          <StatusPolling key={state.fileName} fileName={state.fileName} />
        )}
        {state.error && (
          <div className="text-center mt-4 text-red-600 font-semibold">
            {state.error}
          </div>
        )}
      </div>
    </div>
  );
}
