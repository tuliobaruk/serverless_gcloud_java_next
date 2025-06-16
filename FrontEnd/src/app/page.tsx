import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-[#18181b] dark:to-[#232326] flex flex-col items-center pt-24">
      <main className="flex flex-col gap-8 items-center justify-center flex-1 w-full max-w-2xl px-4">
        <Image
          className="dark:invert mb-2"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-700 dark:text-blue-300 drop-shadow mb-2">
          Redimensionamento de Imagens Serverless
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 max-w-xl mb-4">
          Faça upload de uma imagem, escolha as dimensões desejadas e baixe o
          arquivo já redimensionado. Tudo de forma rápida, segura e sem
          complicação!
        </p>
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center mt-6">
          <Link
            className="flex-1 bg-gradient-to-br from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-700 border border-blue-200 dark:border-blue-800 rounded-xl shadow-lg p-8 hover:scale-105 transition-all flex flex-col items-center gap-3"
            href="/upload-action"
          >
            <Image
              src="/window.svg"
              alt="Redimensionar"
              width={48}
              height={48}
            />
            <span className="text-2xl font-bold text-blue-800 dark:text-blue-200">
              Redimensionar Imagem
            </span>
            <span className="text-base text-gray-700 dark:text-gray-300 text-center">
              Envie sua imagem, defina largura e altura e baixe o resultado em
              segundos!
            </span>
            <span className="mt-2 inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              Começar agora
            </span>
          </Link>
        </div>
      </main>
      <footer className="w-full py-6 flex justify-center items-center text-gray-400 text-xs">
        Exemplo serverless com Next.js, Google Cloud Storage e Cloud Run &copy;{" "}
        {new Date().getFullYear()}
      </footer>
    </div>
  );
}
