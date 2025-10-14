"use client";

import { toast } from 'react-toastify';
import Image from 'next/image';
import qrCode from "../../public/cpnu-next.png"

function PixSection() {
    const pixKey = "2290cbfb-e47c-42f1-a68c-5b4b11fd57a3";

    const handleCopyKey = () => {
        navigator.clipboard.writeText(pixKey)
            .then(() => {
                // Feedback visual para o usuário
                toast.success('Chave PIX copiada para a área de transferência!');
            })
            .catch(err => {
                toast.error('Não foi possível copiar a chave.');
                console.error('Erro ao copiar a chave PIX: ', err);
            });
    };

    return (
        <section className="w-full py-16 md:py-24 bg-gray-900">
            <div className="container mx-auto px-6 md:px-4 text-center max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Apoie este Projeto
                </h2>
                <p className="text-lg text-gray-400 leading-relaxed mb-8">
                    Se esta ferramenta foi útil para você, considere fazer uma doação de qualquer valor via PIX. Sua contribuição ajuda a manter o site no ar e a desenvolver novas funcionalidades.
                </p>

                <div className="bg-gray-800 rounded-lg p-8 border border-gray-700/50 flex flex-col md:flex-row items-center gap-8">
                    {/* Lado do QR Code */}
                    <div className="flex-shrink-0">
                        <Image 
                            src= {qrCode} 
                            alt="QR Code PIX para doação" 
                            width={200} 
                            height={200}
                            className="rounded-md"
                        />
                        
                    </div>

                    {/* Lado do "Copia e Cola" */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className="text-xl font-semibold text-white mb-2">
                            Ou use a chave Copia e Cola
                        </h3>
                        <p className="text-gray-400 mb-4">
                            Clique no botão abaixo para copiar a chave e cole no aplicativo do seu banco.
                        </p>
                        <button
                            onClick={handleCopyKey}
                            className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-all duration-300"
                        >
                            Copiar Chave PIX
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PixSection;