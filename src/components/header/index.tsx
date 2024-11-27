"use client";

import Link from "next/link";
import { FiUser, FiLogOut, FiLoader, FiLock } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {
  const { data, status } = useSession();

  async function handleLogin() {
    await signIn("google");
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/">
          <h1 className="font-bold text-2xl pl-1 hover:tracking-widest duration-300">
            <span className="text-blue-500">DEV</span> CONTROLE
          </h1>
        </Link>

        {status === "loading" && (
          <button className="animate-spin cursor-default">
            <FiLoader size={26} color="#4b5563" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button
            onClick={handleLogin}
            className="hover:scale-110 duration-300"
          >
            <FiLock size={26} color="#4b5563" />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex items-baseline gap-4">
            <Link href="/dashboard" className="hover:scale-110 duration-300">
              <FiUser size={26} color="#4b5563" />
            </Link>

            <button
              onClick={handleLogout}
              className="hover:scale-110 duration-300"
            >
              <FiLogOut size={26} color="#ff2313" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}