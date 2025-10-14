"use client";

import React from 'react';
import { FaQuestion, FaHandshake, FaLightbulb } from 'react-icons/fa';

// 1. Interface Simplificada: Não precisamos mais da função 'action'
interface SupportItem {
  title: string;
  icon: React.ReactNode;
  subject: string;
  message: string;
}

const contactEmail = "dev.matheuspc@gmail.com";

// 2. Dados Atualizados: A função foi removida
const supportOptions: SupportItem[] = [
  {
    title: "Dúvidas",
    icon: <FaQuestion size={24} />,
    subject: "Dúvida sobre o site Consulta CPNU",
    message: "Olá, gostaria de tirar umas dúvidas sobre o site..."
  },
  {
    title: "Parcerias",
    icon: <FaHandshake size={24} />,
    subject: "Proposta de Parceria - Consulta CPNU",
    message: "Olá, gostaria de propor uma parceria..."
  },
  {
    title: "Sugestões",
    icon: <FaLightbulb size={24} />,
    subject: "Sugestão para o site Consulta CPNU",
    message: "Olá, tenho uma sugestão de melhoria para o site..."
  },
];


function ContactSection() {
  return (
    <section className='w-full py-16 md:py-24'>
      <div className='container mx-auto flex flex-col items-center gap-8'>
        <h2 className='text-3xl font-bold tracking-tight'>Área de Suporte</h2>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl'>
          {supportOptions.map((item) => {
            // Criamos o link mailto dinamicamente aqui
            const mailToLink = `mailto:${contactEmail}?subject=${encodeURIComponent(item.subject)}&body=${encodeURIComponent(item.message)}`;
            
            return (
              // 3. A MUDANÇA PRINCIPAL: Usando <a> em vez de <button>
              <a
                key={item.title}
                href={mailToLink}
                className="group flex flex-col items-center justify-center p-6 gap-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700/50 hover:bg-gray-700/50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  {item.icon}
                </div>
                <span className="font-semibold text-lg text-gray-300 group-hover:text-white transition-colors">
                  {item.title}
                </span>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  )
}

export default ContactSection;