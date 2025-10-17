'use client';

import { useEffect, useRef, useState } from "react"
import { toast } from 'react-toastify';
import ResultTable from "./UI/ResultTable";

interface DataItem {
    cargo: string,
    orgao: string,
    ordem_pref: number,
    class_ampla: number,
    class_ppp: number,
    class_pcd: number,
    class_ind: number,
}

function Hero() {
    const [inscricao, setInscricao] = useState<number | null>(null);
    const [data, setData] = useState<DataItem[] | null>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const searchContainerRef = useRef<HTMLDivElement>(null)
    const tableContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        console.log(data)
    }, [data])

    async function handleSearch() {
        const inscricaoStr = inscricao?.toString()
        if (!inscricaoStr?.trim()) {
            toast.warn('Por favor, digite um número de inscrição válido.');
            return
        }

        if (inscricaoStr?.length != 10) {
            toast.warn(`O numero de inscrição deve conter 10 digitos, você digitou ${inscricaoStr?.length}`)
            return
        }

        try {
            setLoading(true);
            const response = await fetch(`/api/situacao/${inscricaoStr}`);

            const res_data = await response.json();

            if (!response.ok) {
                const errorMessage = res_data.mensagem || res_data.error || "Ocorreu um erro na resposta do servidor.";
                throw new Error(errorMessage);
            }


            setData(res_data.data)
            // searchContainerRef?.current?.classList.add("hidden")
            tableContainerRef?.current?.classList.remove("hidden")
            toast.success("Dados encontrados com sucesso!");


        } catch (error) {
            // Se der algum erro de rede ou na API, ele será capturado aqui
            let errorMessage = "Ocorreu um erro ao conectar com o servidor.";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            toast.error(errorMessage);
            console.error("[Frontend] Erro ao fazer a requisição:", error);
            
        } finally {
            setLoading(false)
        }
    }



    return (
        <main className="flex-grow flex items-center overflow-x-hidden my-5">
            <section className="w-full h-full flex flex-col justify-between gap-10" >
                <div
                    className="container mx-auto px-4 text-center"
                    ref={searchContainerRef}>
                    <h1 className="text-white font-bold text-3xl"> Consulte sua situação no Cadastro de Reserva do CPNU</h1>
                    <p className="text-lg text-gray-300 mb-8">
                        Digite o número da sua inscrição abaixo para ver os detalhes da sua classificação.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                        <label htmlFor="search-inscricao" className="sr-only">Número de Inscrição</label>
                        <input
                            id="search-inscricao"
                            type="number"
                            placeholder="Digite o nº da sua inscrição"
                            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            value={inscricao ?? ''}
                            onChange={(e) => setInscricao(e.target.value === '' ? null : e.target.valueAsNumber)}
                            onKeyUp={(e) => e.key == "Enter" && handleSearch()}
                        />
                        <button
                            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700"
                            onClick={handleSearch}
                        >Buscar</button>
                    </div>
                </div>
                <div ref={tableContainerRef}
                    className="hidden container mx-auto px-4">
                    {
                        data && data.length > 0 && (
                            <ResultTable 
                            data={data}
                            loading={loading}
                            />
                        )
                    }
                </div>
       
            </section>

        </main>
    )
}

export default Hero