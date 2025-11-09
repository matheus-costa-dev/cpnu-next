"use client"; // Componentes com estado e eventos precisam ser Client Components

import React, { useEffect, useState } from "react";
import ResultTable from "./UI/ResultTable";
import DropDown from "./UI/Dropdown";
import { TableColumn } from "react-data-table-component";

interface Resultado {
  bloco: number;
  orgao: string;
  cargo: string;
  especialidade: string;
  cod_cargo: number;
  numero_de_inscricao: number;
  nome: string;
  classificacao_ac: number;
  classificacao_pcd: number;
  classificacao_negra: number;
  classificacao_indigena: number;
}

function Estimativa() {
  const [data, setData] = useState<Resultado[] | null>([]);
  const [codigoCargos, setCodigoCargos] = useState<[]>([]);
  const [codCargoSelecionado, setCodCargoSelecionado] = useState<
    string | undefined
  >(undefined);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getCodigoCargos().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    console.log(codCargoSelecionado);
  }, [codCargoSelecionado]);

  async function getCodigoCargos() {
    const res = await fetch("/api/codigo-cargos");
    const rows = await res.json();
    console.log(rows.data);
    setCodigoCargos(rows.data);
  }

  async function getData(codigo_cargo: string) {
    const response = await fetch(`/api/estimativa?cod_cargo=${codigo_cargo}`);
    const result = await response.json();
    setData(result.data);
    console.log(result.data); // aqui sim mostra os dados
  }

  function handleChangeCodCargo(val: string | undefined) {
    console.log(val);
    setCodCargoSelecionado(val);

    if (val) getData(val);
  }

  const columns: TableColumn<Resultado>[] = [
    {
      name: "Bloco",
      selector: (row) => row.bloco,
      sortable: true,
      center: true,
    },
    {
      name: "Orgao",
      selector: (row) => row.orgao,
      sortable: true,
      center: true,
    },
    {
      name: "Cargo",
      selector: (row) => row.cargo,
      sortable: true,
      wrap: true,
      center: true,
    },
    {
      name: "Especialidade",
      selector: (row) => row.especialidade,
      sortable: true,
      wrap: true,
      center: true,
    },
    {
      name: "Nº Inscricao",
      selector: (row) => row.numero_de_inscricao,
      sortable: true,
      center: true,
    },
    {
      name: "Nome",
      selector: (row) => row.nome,
      sortable: true,
      wrap: true,
      center: true,
    },
    {
      name: "Ampla",
      selector: (row) => row.classificacao_ac,
      sortable: true,
      center: true,
    },
    {
      name: "PCD",
      selector: (row) => row.classificacao_pcd,
      sortable: true,
      center: true,
    },
    {
      name: "PPP",
      selector: (row) => row.classificacao_negra,
      sortable: true,
      center: true,
    },
    {
      name: "Indigena",
      selector: (row) => row.classificacao_indigena,
      sortable: true,
      center: true,
    },
  ];

  return (
    <section className="min-h-screen w-full flex flex-col items-center gap-8 px-4 py-8 bg-gray-900 text-white">
      {/* Cabeçalho com título e explicação */}
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
          Estimativa de Classificação no Cadastro de Reserva
        </h1>
        <p className="text-gray-300 text-sm md:text-base">
          Esta estimativa foi gerada por meio de processamento avançado
          utilizando técnicas de <strong>Machine Learning</strong>, aplicadas aos dados oficiais
          do concurso. Em breve será publicado um paper detalhando
          todo o processo, incluindo a metodologia, os critérios estatísticos e
          as métricas de avaliação do modelo, como matriz de confusão,
          precision, recall, accuracy e outras análises relevantes. <br/> Selecione o 
           <strong> código do cargo</strong> para visualizar sua posição estimada e compreender
          melhor os resultados.
        </p>
      </div>

      {/* Select centralizado horizontalmente */}
      <div className="w-full flex justify-center">
        <DropDown
          opcoes={codigoCargos}
          value={codCargoSelecionado}
          onChange={handleChangeCodCargo}
          placeholder="Selecione o codigo do cargo"
        />
      </div>

      {/* Espaço para tabela */}
      <div className="w-full mt-4">
        <div className="bg-gray-800 rounded-2xl text-center">
          {data && data.length > 0 && (
            <ResultTable data={data} columns={columns} loading={loading} />
          )}
        </div>
      </div>
    </section>
  );
}

export default Estimativa;
