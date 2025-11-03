'use client'

import React from 'react'
import DataTable, {TableColumn} from 'react-data-table-component'

type Resultado = {
    cargo: string,
    orgao: string,
    especialidade: string,
    ordem_pref: number,
    class_ampla: number,
    class_ppp: number | null,
    class_pcd: number | null,
    class_indigena: number | null,
}

const columns: TableColumn<Resultado>[] = [
    {
        name: "Órgão",
        selector: row => row.orgao,
        sortable: true
    },
    {
        name:"Cargo",
        selector: row => row.cargo,
        sortable: true,
    },
    {
        name:"Especialidade",
        selector: row => row.especialidade,
        sortable: true,
    },
    {
        name:"Prefêrencia",
        selector: row => row.ordem_pref,
        sortable: true,
    },
    {
        name:"Ampla",
        selector: row => row.class_ampla ?? "N/A",
        center: true,
        sortable: true
    },
    {
        name:"PPP",
        selector: row => row.class_ppp ?? "N/A",
        center: true,
        sortable: true
    },
    {
        name:"PCD",
        selector: row => row.class_pcd ?? "N/A",
        center: true,
        sortable: true
    },
    {
        name:"Indigena",
        selector: row => row.class_indigena ?? "N/A",
        center: true,
        sortable: true
    }

]

function ResultTable({data, loading}: {data:Resultado[], loading: boolean}) {
  return (
        <div className="mt-8 rounded-lg overflow-hidden border border-gray-700">
            <DataTable
                columns={columns}
                data={data}
                progressPending={loading} // Mostra um esqueleto de carregamento
                pagination // Habilita a paginação!
                highlightOnHover
                pointerOnHover
                responsive
                theme="dark" // Usa o tema escuro nativo!
                noDataComponent={<div className="p-8 text-center text-gray-400">Nenhum resultado encontrado.</div>}
                progressComponent={<div className="p-8 text-center text-indigo-400">Carregando dados...</div>}
            />
        </div>
    );
}

export default ResultTable