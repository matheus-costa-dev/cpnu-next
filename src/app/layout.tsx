// arquivo: src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Importe o CSS e o Container do react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Componentes do layout base
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Vamos melhorar os metadados para o seu projeto
  title: "Consulta de Situação - CPNU",
  description: "Consulte os detalhes da sua classificação no Concurso Público Nacional Unificado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-800 text-white flex flex-col min-h-screen
        `}
      >
        <Navbar />
        <main className="flex-grow flex items-center">
          {children} {/* O conteúdo de page.tsx será renderizado aqui */}
        </main>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" // Perfeito para o seu design
        />
      </body>
    </html>
  );
}