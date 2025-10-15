"use client"; // Componentes com estado e eventos precisam ser Client Components

import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

function Dashboard() {
    const [loading, setLoading] = useState<boolean>(true);

    const handleIframeLoad = () => {
        setLoading(false);
    };

    return (
        <div className="w-full min-h-screen">
            
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
            />
        </div>
    );
}

export default Dashboard;