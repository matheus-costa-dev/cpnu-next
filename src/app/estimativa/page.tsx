import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Estimativa - Consulta CPNU",
  description:
    "Obtenha estimativas precisas para o Cadastro de Reserva do CPNU. Utilize nossas ferramentas para prever classificações com base em dados históricos e tendências atuais.",
  keywords: "Estimativa CPNU, Previsão Concurso, Análise de Dados CPNU",
};

export default function Estimate() {
  const dev = true;

  if (dev)  {
    return(
      <div className="text-center w-full h-full text-2xl">em desenvolvimento</div>
    )
  }

  return (
    <section className="min-h-screen w-full flex flex-col items-center gap-8 px-4 py-8 bg-gray-900 text-white">
      
      {/* Cabeçalho com título e explicação */}
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
          Texto a ser implementado
        </h1>
        <p className="text-gray-300 text-sm md:text-base">
          Explicação de como funciona, com detalhes sobre a estimativa e a análise de dados.
        </p>
      </div>

      {/* Select centralizado horizontalmente */}
      <div className="w-full flex justify-center">
        <select className="bg-gray-700 text-white rounded-2xl p-3 w-full max-w-xs" >
          <option value="">Código do cargo</option>
          <option value="1001">1001</option>
          <option value="1002">1002</option>
          <option value="1003">1003</option>
          <option value="1001">1001</option>
          <option value="1002">1002</option>
          <option value="1003">1003</option>
          <option value="1001">1001</option>
          <option value="1002">1002</option>
          <option value="1003">1003</option>
          <option value="1001">1001</option>
          <option value="1002">1002</option>
          <option value="1003">1003</option>
        </select>
      </div>

      {/* Espaço para tabela */}
      <div className="w-full max-w-4xl mt-4">
        <div className="bg-gray-800 p-4 rounded-2xl text-center">
          Tabela vai entrar aqui
        </div>
      </div>
      
    </section>
  );
}
