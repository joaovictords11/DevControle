import Link from "next/link";
import React from "react";
import { FiHome } from "react-icons/fi";

const NotFound = () => {
  return (
    <main className="flex items-center flex-col justify-center">
      <h1 className="mt-32 font-bold text-7xl">404</h1>
      <h2 className="text-2xl">Ops! Página não encontrada</h2>
      <Link
        href="/"
        className="bg-blue-500 mt-8 px-4 h-11 flex items-center gap-2 rounded hover:bg-blue-600 duration-300 text-white font-semibold"
      >
        <FiHome size={22}/>
        Home
      </Link>
    </main>
  );
};

export default NotFound;
