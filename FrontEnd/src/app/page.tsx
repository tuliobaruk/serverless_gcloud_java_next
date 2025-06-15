import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-[#18181b] dark:to-[#232326] flex flex-col items-center">
      <main className="flex flex-col gap-8 items-center justify-center flex-1 w-full max-w-2xl px-4">
        <Image
          className="dark:invert mb-2"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-gray-100">
          Exemplo Serverless com Google Cloud Storage & Cloud Run
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 max-w-xl">
          Manipule arquivos PDF e imagens de forma serverless utilizando Next.js,
          Google Cloud Storage e Cloud Run.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center mt-6">
          <a
            className="flex-1 bg-white dark:bg-[#232326] border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-all flex flex-col items-center gap-2"
            href="/upload-action"
          >
            <span className="text-xl font-semibold text-blue-700 dark:text-blue-400">
              Server Action
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Upload direto via Server Action
            </span>
          </a>
          <a
            className="flex-1 bg-white dark:bg-[#232326] border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-all flex flex-col items-center gap-2"
            href="/upload-api"
          >
            <span className="text-xl font-semibold text-green-700 dark:text-green-400">
              API Route
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Upload via rota de API
            </span>
          </a>
          <a
            className="flex-1 bg-white dark:bg-[#232326] border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-all flex flex-col items-center gap-2"
            href="/upload-signed-url"
          >
            <span className="text-xl font-semibold text-purple-700 dark:text-purple-400">
              Signed URL
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Upload usando Signed URL
            </span>
          </a>
        </div>
      </main>
      <footer className="w-full py-6 flex justify-center items-center text-gray-400 text-xs">
        Exemplo serverless com Next.js, Google Cloud Storage e Cloud Run &copy;{" "}
        {new Date().getFullYear()}
      </footer>
    </div>
  );
}
