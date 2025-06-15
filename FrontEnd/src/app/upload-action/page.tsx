import { UploadFile } from '@/lib/actions';
import React from 'react';

export default function FileUpload() {
  return (
    <>
      <h1 className='text-gray-600 text-xl m-8'>Upload usando Server Action</h1>
      <form action={UploadFile} className="max-w-md mx-auto bg-white dark:bg-[#232326] rounded-xl shadow p-8 flex flex-col gap-4">
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
    </>
  );
}
