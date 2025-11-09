import FaqSection from "@/components/FaqSection";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perguntas Frequentes (FAQ) - Consulta CPNU",
  description:
    "Tire suas dúvidas sobre o Consulta CPNU. Entenda como os dados são calculados, a origem das informações e o objetivo do nosso projeto.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qual o objetivo deste site?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O objetivo é simples: oferecer a você, candidato do CPNU, uma forma rápida e clara de consultar sua classificação detalhada no cadastro de reserva, sem a complexidade dos documentos e planilhas oficiais.",
      },
    },
    {
      "@type": "Question",
      name: "Os dados apresentados são oficiais?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. Todos os cálculos de classificação são baseados nos microdados oficiais divulgados pelo ministério da gestão e inovação em serviços públicos (MGI). Este site apenas organiza e apresenta essas informações de uma forma mais acessível.",
      },
    },
    {
      "@type": "Question",
      name: "Como a minha classificação é calculada?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sua classificação é calculada considerando apenas os candidatos que manifestaram interesse em permanecer no cadastro de reserva, agrupados por Bloco Temático e Cargo, e então rankeados dentro de cada modalidade de concorrência (Ampla, PPP, etc.).",
      },
    },
  ],
};

function page() {
  return (
    <div className="py-10 container mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqSection />
    </div>
  );
}

export default page;
