import React from "react";
import ContactSection from "@/components/ContactSection";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós | Missão, Visão e Valores - Transparência e Inovação",
  description:
    "Conheça nossa missão, visão e valores: promover transparência, tecnologia e inteligência de dados para análise do Cadastro de Reserva do CPNU. Nossa estimativa é baseada em Machine Learning e em breve publicaremos um artigo científico com métricas como precisão, recall, acurácia e matriz de confusão. Saiba como usamos inovação para transformar processos e oferecer informações confiáveis aos candidatos.",
};

function page() {
  return (
    <div className="w-full">
      <ContactSection />
    </div>
  );
}

export default page;
