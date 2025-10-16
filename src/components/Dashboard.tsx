"use client"; // Componentes com estado e eventos precisam ser Client Components



import React, { useState } from 'react';

import { FaExternalLinkAlt, FaSpinner } from 'react-icons/fa';


function Dashboard() {
    const [loading, setLoading] = useState<boolean>(true);

    const handleIframeLoad = () => {
        setLoading(false);
    };

    return (
        <div className="w-full min-h-screen">

            <div className='w-full flex flex-col py-4 gap-2 items-center'>
                <span className='text-center w-full'>Se o dashboard não carregar, acesse diretamente no</span>
                <div className='bg-indigo-400 flex rounded-3xl items-center p-3 gap-2'>
                    <FaExternalLinkAlt />
                    <a
                        className='text-center text-wrap'
                        href="https://lookerstudio.google.com/embed/reporting/97df5b37-3b48-4425-92e0-cdccf5d0e0c8/page/p2obF">
                        Google Data Studio
                    </a>
                </div>
            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center w-full h-full min-h-screen text-gray-500">
                    <FaSpinner className="animate-spin text-4xl mb-4" />
                    <p className="text-lg font-semibold tracking-wider">Carregando Dashboard...</p>
                </div>
            )}

            <iframe
                className={`${loading ? 'hidden' : 'block'} w-full min-h-screen`}
                src="https://lookerstudio.google.com/embed/reporting/97df5b37-3b48-4425-92e0-cdccf5d0e0c8/page/p2obF"
                frameBorder="0"
                onLoad={handleIframeLoad}
                style={{ border: 0 }}
                allowFullScreen
                sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            />


        </div>
    );
}

export default Dashboard;