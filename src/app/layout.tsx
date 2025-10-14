// arquivo: src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

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
  // 1. Título Otimizado
  title: "Consulta CPNU - Classificação no Cadastro de Reserva",
  
  // 2. Descrição Otimizada
  description: "Consulte sua classificação detalhada no Cadastro de Reserva do CPNU. Ferramenta não oficial para verificar sua posição por cargo, bloco e cotas.",
  
  // 3. Palavras-chave (Keywords)
  keywords: "CPNU, Concurso Nacional Unificado, Cadastro de Reserva, Consulta CPNU, Classificação CPNU, Resultado CPNU, Concurso Público",
  
  // 4. Autor
  authors: [{ name: 'Matheus Costa', url: 'https://portfolio-brown-gamma-63.vercel.app/' }],

  // 5. Open Graph (para compartilhamento em redes sociais)
  openGraph: {
    title: "Consulta CPNU - Classificação no Cadastro de Reserva",
    description: "Ferramenta não oficial para verificar sua posição por cargo, bloco e cotas.",
    url: 'https://cpnu-next.vercel.app/', // Substitua pelo seu domínio https://www.consultacpnu.com.br quando estiver no ar
    siteName: 'Consulta CPNU',
    // images: [ // Adicione uma imagem de preview quando tiver uma
    //   {
    //     url: 'https://www.consultacpnu.com.br/og-image.png', 
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
    locale: 'pt_BR',
    type: 'website',
  },
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

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

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />


      {/* 2. Adicione os scripts do Google Analytics aqui, fora do body principal, mas dentro do <html> */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </html>
  );
}