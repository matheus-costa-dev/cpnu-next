import type { Metadata } from "next";
import Estimativa from "@/components/Estimativa";

export const metadata: Metadata = {
  title: "Estimativa - Consulta CPNU",
  description:
    "Obtenha estimativas precisas para o Cadastro de Reserva do CPNU. Utilize nossas ferramentas para prever classificações com base em dados históricos e tendências atuais.",
  keywords: "Estimativa CPNU, Previsão Concurso, Análise de Dados CPNU",
};


export default function Estimate() {
  return(
    <Estimativa />
  )
}
