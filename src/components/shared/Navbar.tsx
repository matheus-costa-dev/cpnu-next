"use client"; // Necessário para usar hooks como o useState

import React, { useState } from 'react';
import Link from 'next/link'; // Use o componente Link do Next.js para navegação interna
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa'; // FaBars é mais comum para hamburger, FaTimes para fechar
import { usePathname } from 'next/navigation';

interface linksType {
  title: string,
  href: string,
}

const links: linksType[] = [
  {
    title: "Consulta",
    href: "/"
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Perguntas Frequentes",
    href: "/faq",
  },
  {
    title: "Contribuir",
    href: "/contribuir"
  }
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();

  const NavLinks = () => (
    <>
      {links.map((item) => {

        if (pathName === "/" && item.title == "Consulta") {
          return
        }


        return (
          <Link
            key={item.title}
            href={item.href}
            onClick={() => setIsMenuOpen(false)} // Fecha o menu ao clicar em um link
            className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium transition-colors"
          >
            {item.title}
          </Link>
        )
      })}
      <a
        href="https://portfolio-brown-gamma-63.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200"
      >
        <FaUserCircle size={18} />
        <span>Desenvolvedor</span>
      </a>
    </>
  );

  return (
    <nav className="bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Título */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl sm:text-2xl font-bold text-white tracking-wider">
              Consulta CPNU
            </Link>
          </div>

          {/* Links do Menu Desktop (escondido em telas pequenas) */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <NavLinks />
          </div>

          {/* Botão Hamburger (visível apenas em telas pequenas) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Abrir menu principal</span>
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Móvel Colapsável */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="flex flex-col items-center gap-4 px-2 pt-2 pb-3 sm:px-3">
          <NavLinks />
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
