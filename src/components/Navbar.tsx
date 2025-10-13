// src/components/Navbar.tsx

import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
    return (
       <nav className="bg-gray-900 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-2 md:flex-row p-4 items-center justify-between">
              
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wider">
                Consulta CPNU
              </h1>

              <div>
                <a 
                    href="https://portfolio-brown-gamma-63.vercel.app/"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200"
                >
                    <FaUserCircle size={18} />
                    <span>Desenvolvedor</span>
                </a>
              </div>

            </div>
        </div>
       </nav>
    )
}

export default Navbar