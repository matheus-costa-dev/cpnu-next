// src/components/FaqSection.tsx
"use client";

import React, { useState, ReactNode } from 'react';
import { FaArrowDown } from 'react-icons/fa';

// A interface e os dados que você já tinha
interface FaqItem {
    question: string;
    answer: string | ReactNode;
}

const faqData: FaqItem[] = [
    {
        question: "1. Qual o objetivo deste site?",
        answer: "O objetivo é simples: oferecer a você, candidato do CPNU, uma forma rápida e clara de consultar sua classificação detalhada no cadastro de reserva, sem a complexidade dos documentos e planilhas oficiais."
    },
    {
        question: "2. Por que este site foi criado?",
        answer: "Este projeto nasceu da necessidade de maior transparência no concurso. Acreditamos que, ao fornecer acesso facilitado aos dados, empoderamos os candidatos a acompanhar o processo de convocação e a entender sua real situação na disputa pela vaga."
    },
    {
        question: "3. Os dados apresentados são oficiais?",
        answer:
            <>
                Sim. Todos os cálculos de classificação são baseados nos microdados oficiais divulgados pelo ministério da gestão e inovação em serviços públicos (MGI). Este site apenas organiza e apresenta essas informações de uma forma mais acessível, sem alterar os dados brutos de origem. Você pode consultar os dados oficiais <a
                    className='text-blue-500'
                    target='_blank'
                    href='https://www.gov.br/gestao/pt-br/concursonacional/manifestacao-de-interesse/resultados-por-bloco'>aqui</a>
            </>
    },
    {
        question: "4. Como a minha classificação é calculada?",
        answer: (
            <>
                <p className="mb-2">Sua classificação é calculada seguindo uma metodologia clara, baseada nos dados oficiais:</p>
                <ul className="list-disc list-inside space-y-1">
                    <li><strong>Filtro de Interesse:</strong> A lista considera apenas os candidatos que manifestaram interesse em permanecer no cadastro de reserva.</li>
                    <li><strong>Agrupamento:</strong> Os candidatos são separados por Bloco Temático e, dentro de cada bloco, agrupados pelo Cargo específico.</li>
                    <li><strong>Rankeamento:</strong> Sua posição final é calculada dentro desse grupo (Bloco-Cargo), gerando a classificação que você vê para cada modalidade de concorrência (Ampla, PPP, etc.).</li>
                </ul>
            </>
        )
    },
    {
        question: "5. A lista remove candidatos que já foram nomeados?",
        answer: "Não. A classificação reflete sua posição com base nos microdados mais recentes divulgados."
    },
    {
        question: "6. A lista leva em consideração a ordem de preferência e faz a remoção dos prováveis convocados?",
        answer:
            <>
                <p className="mb-2">
                    Essa é uma funcionalidade avançada que ainda <strong>não está implementada</strong>. A classificação que você vê hoje é a sua posição bruta dentro de cada cargo, sem simular a remoção de candidatos mais bem classificados que possam ser convocados em outras preferências.
                </p>
                <p>
                    Para criar uma estimativa precisa, é necessário cruzar os dados atuais com a <strong>quantidade oficial de vagas disponíveis para cada combinação de Bloco-Cargo</strong>. Assim que esses dados forem oficialmente divulgados pelo MGI, pretendemos explorar a possibilidade de implementar essa funcionalidade no futuro.
                </p>
            </>

    },
    {
        question: "7. O que significam as colunas da tabela?",
        answer: "As colunas representam as diferentes modalidades de concorrência: 'Ampla' (Ampla Concorrência), 'PPP' (cota para Pessoas Pretas ou Pardas), 'PCD' (cota para Pessoas com Deficiência) e 'Indígena' (cota para povos originários). Um candidato de cota concorre simultaneamente na sua lista específica e na lista de Ampla Concorrência."
    },
];

function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full mt-auto">
            <div className="container mx-auto px-6 md:px-4 max-w-4xl">
                <h3 className="text-3xl font-bold text-white text-center mb-12">
                    Perguntas Frequentes (FAQ)
                </h3>

                <div className="shadow-lg">
                    {faqData.map((faq, index) => (
                        <div key={index} className="bg-gray-800/50 border border-gray-700/50 rounded-lg overflow-hidden">
                            {/* 3. BOTÃO: A pergunta agora é um botão que aciona a função de toggle */}
                            <button
                                onClick={() => handleToggle(index)}
                                className="w-full flex justify-between items-center text-left p-6 cursor-pointer hover:bg-gray-700/50 focus:outline-none"
                            >
                                <h4 className="font-semibold text-xl text-white">
                                    {faq.question}
                                </h4>
                                <FaArrowDown
                                    className={`h-6 w-6 text-gray-400 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}

                                />
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