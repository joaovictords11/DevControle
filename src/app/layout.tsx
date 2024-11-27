import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { AuthProvider } from "@/providers/authProvider";
import { ModalProvider } from "@/providers/modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev Controle - Seu sistema de gerencimaneto.",
  description: "Gerencie seus clientes e atendimentos de forma fácil!",
  icons: {
    icon: "/devicon.png",
  },
  keywords: [
    "DevControle",
    "gerenciador",
    "gerenciamento",
    "gerenciador de clientes",
  ],
  openGraph: {
    title: "Dev Controle - Seu sistema de gerencimaneto.",
    images: [`${process.env.HOST_URL}/devicon.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ModalProvider>
            <Header />
            {children}
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
