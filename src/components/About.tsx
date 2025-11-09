"use client";

import React from "react";

function About() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center gap-8 px-6 py-12 bg-gray-900 text-white">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">Sobre Nós</h1>
        <p className="text-gray-300 text-lg">
          Conheça nossa missão, visão e valores que orientam cada passo do nosso trabalho.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl mt-10">
        {/* Missão */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Missão</h2>
          <p className="text-gray-300">
            Oferecer soluções inovadoras e acessíveis que promovam transparência e eficiência,
            utilizando tecnologia e inteligência de dados para transformar processos e gerar valor
            para a sociedade.
          </p>
        </div>

        {/* Visão */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Visão</h2>
          <p className="text-gray-300">
            Ser referência nacional em desenvolvimento de ferramentas inteligentes para análise e
            gestão de informações, contribuindo para um futuro mais justo e digital.
          </p>
        </div>

        {/* Valores */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Valores</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Ética e Transparência</li>
            <li>Inovação e Tecnologia</li>
            <li>Compromisso com a Qualidade</li>
            <li>Responsabilidade Social</li>
            <li>Foco no Usuário</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;