'use client';
import React, { useActionState, useState } from 'react';
import { UploadFile } from '@/lib/actions';
import { StatusPolling } from './StatusPolling';

type UploadState = {
  fileName?: string;
  error?: string;
};

const initialState: UploadState = {};
const MAX_DIM = Number(process.env.NEXT_PUBLIC_MAX_IMAGE_DIMENSION) || 4000;

export default function FileUpload() {
  const [state, formAction] = useActionState<UploadState, FormData>(UploadFile, initialState);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-[#232326] dark:to-[#18181b]">
      <div className="w-full max-w-lg bg-white dark:bg-[#232326] rounded-2xl shadow-xl p-10">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 dark:text-blue-300 mb-2">
          Redimensionamento de Imagens Serverless
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Faça upload de uma imagem e escolha as dimensões desejadas. O arquivo será processado rapidamente e você poderá baixá-lo já redimensionado!
        </p>
        <form
          action={formAction}
          className="flex flex-col gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="file">
              Selecione a imagem <span className="text-xs text-gray-400">(JPG, PNG, até 10MB)</span>
            </label>
            <input
              type="file"
              name="file"
              id="file"
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                htmlFor="width"
              >
                Largura desejada <span className="text-xs text-gray-400">(1 a {MAX_DIM} px)</span>
              </label>
              <input
                type="number"
                name="width"
                id="width"
                placeholder="Ex: 800"
                min={1}
                max={MAX_DIM}
                value={width}
                onChange={e => {
                  const val = e.target.value;
                  if (!val || Number(val) <= MAX_DIM) setWidth(val);
                }}
                className="no-spinner w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200"
                required
                autoComplete="off"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="height">
                Altura desejada <span className="text-xs text-gray-400">(1 a {MAX_DIM} px)</span>
              </label>
              <input
                type="number"
                name="height"
                id="height"
                placeholder="Ex: 600"
                min={1}
                max={MAX_DIM}
                value={height}
                onChange={e => {
                  const val = e.target.value;
                  if (!val || Number(val) <= MAX_DIM) setHeight(val);
                }}
                className="no-spinner w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200"
                required
                autoComplete="off"
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow font-semibold transition"
          >
            Enviar e Redimensionar
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
