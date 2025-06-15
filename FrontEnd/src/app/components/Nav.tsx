import Link from "next/link";
import React from "react";

function Nav() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-[#18181b]/80 backdrop-blur border-b border-gray-100 dark:border-gray-800 z-50 shadow-sm">
      <div className="max-w-4xl mx-auto flex gap-6 px-6 py-4 items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-lg text-blue-700 dark:text-blue-400 tracking-tight">
            Homepage
          </span>
        </Link>
        <div className="flex gap-4 ml-auto">
          <Link
            className="px-4 py-2 rounded-md font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
            href="/upload-action"
          >
            Redimensionar Imagem
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
