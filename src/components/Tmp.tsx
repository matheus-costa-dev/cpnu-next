// Diretiva para o Next.js App Router, informando que é um Componente de Cliente
"use client";

import React, { useState, ReactNode } from 'react';

// 1. (Opcional, mas recomendado) Definindo um tipo para nossos dados do FAQ
interface FaqItem {
    question: string;
    answer: string | ReactNode; // A resposta pode ser um texto ou um elemento JSX
}

// --- Seus Dados do FAQ ---
const faqData: FaqItem[] = [
    {
        question: "1. Qual a validade do concurso CPNU?",
        answer: "A validade do Concurso Público Nacional Unificado (CPNU) é definida pelo edital oficial. Conforme a legislação, o concurso tem validade inicial de até 2 anos, podendo ser prorrogado uma única vez por igual período, totalizando até 4 anos de vigência. É durante todo este tempo que o Cadastro de Reserva pode ser utilizado."
    },
    {
        question: "2. Qual a previsão de convocação do Cadastro de Reserva?",
        answer: (
            <>
                <p className="mb-4">
                    Não existe um calendário oficial fixo, pois a convocação depende de fatores como o surgimento de novas vagas e a disponibilidade orçamentária. Geralmente, o processo se inicia após a nomeação de todos os aprovados nas vagas imediatas. Os principais fatores que influenciam o ritmo das convocações são:
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Necessidade de pessoal de cada órgão.</li>
                    <li>Disponibilidade de verba no Orçamento Federal.</li>
                    <li>Vagas abertas por aposentadorias, exonerações, etc.</li>
                    <li>Prioridade política para o fortalecimento do serviço público.</li>
                </ul>
            </>
        )
    },
    {
        question: "3. O que significam as colunas Ampla, PPP, PCD e Indígena?",
        answer: "Essas colunas representam as modalidades de concorrência. 'Ampla' é a lista geral. 'PPP' é a cota para Pessoas Pretas ou Pardas. 'PCD' é para Pessoas com Deficiência, e 'Indígena' é a cota para povos originários. Candidatos cotistas concorrem simultaneamente na lista específica e na lista de Ampla Concorrência."
    }
];


function FaqSection() {
    // 2. Tipando o estado: ele pode ser um número (o índice aberto) ou nulo (todos fechados)
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // 3. A CORREÇÃO PRINCIPAL: Adicionando o tipo 'number' ao parâmetro 'index'
    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full py-16 md:py-24">
            <div className="container mx-auto px-6 md:px-4 max-w-4xl">
                <h3 className="text-3xl font-bold text-white text-center mb-12">
                    Perguntas Frequentes (FAQ)
                </h3>
                
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div key={index} className="bg-gray-800/50 border border-gray-700/50 rounded-lg overflow-hidden">
                            <button
                                onClick={() => handleToggle(index)}
                                className="w-full flex justify-between items-center text-left p-6 cursor-pointer hover:bg-gray-700/50 focus:outline-none"
                            >
                                <h4 className="font-semibold text-xl text-white">
                                    {faq.question}
                                </h4>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-6 w-6 text-gray-400 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div
                                className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-screen' : 'max-h-0'}`}
                            >
                                <div className="p-6 pt-0 text-gray-400 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FaqSection;