'use client';
import React, { useActionState } from 'react';
import { UploadFile } from '@/lib/actions';
import { StatusPolling } from './StatusPolling';

type UploadState = { fileName?: string; error?: string };
const initialState: UploadState = {};

export default function FileUpload() {
  const [state, formAction] = useActionState<UploadState, FormData>(UploadFile, initialState);

  return (
    <>
      <h1 className='text-gray-600 text-xl m-8'>Upload usando Server Action</h1>
      <form action={formAction} className="max-w-md mx-auto bg-white dark:bg-[#232326] rounded-xl shadow p-8 flex flex-col gap-4">
        <input
          type='file'
          name='file'
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 mb-4"
        />
        <button
          type='submit'
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow font-semibold transition'
        >
          Enviar arquivo
        </button>
      </form>
      {state.fileName && (
        <StatusPolling fileName={state.fileName} />
      )}
      {state.error && (
        <div className="text-center mt-4 text-red-600 font-semibold">{state.error}</div>
      )}
    </>
  );
}
