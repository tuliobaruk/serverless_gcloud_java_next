import React from 'react';

export default function UploadWithApi() {
  return (
    <>
      <h1 className='text-gray-600 text-xl m-8'>Upload usando API</h1>
      <form
        action='/api/upload'
        method='POST'
        encType='multipart/form-data'
        className='max-w-md mx-auto bg-white dark:bg-[#232326] rounded-xl shadow p-8 flex flex-col gap-4'
      >
        <input
          type='file'
          name='file'
          className='block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-200 mb-4'
        />
        <button
          type='submit'
          className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow font-semibold transition'
        >
          Enviar arquivo
        </button>
      </form>
    </>
  );
}