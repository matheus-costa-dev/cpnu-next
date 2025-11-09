"use client";

import React from "react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

const contactEmail = "dev.matheuspc@gmail.com";
// Sugestão: defina no .env.local => NEXT_PUBLIC_CONTACT_WHATSAPP=+55DDDNNNNNNN
const contactPhone = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? "+55XXXXXXXXXX";

// Utilitários
function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

function mailtoLink(email: string, subject: string, body: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function whatsappLink(phone: string, text: string) {
  const normalized = normalizePhone(phone);
  return `https://wa.me/${normalized}?text=${encodeURIComponent(text)}`;
}

export default function ContactSection() {
  // Textos padrões (ajuste como preferir)
  const heading = "Fale com a gente";
  const blurb =
    "Em caso de dúvidas, propostas de parceria, sugestões ou qualquer outro assunto, entre em contato pelos canais abaixo. Teremos prazer em ajudar!";

  const emailSubject = "Contato - Consulta CPNU";
  const emailBody =
    "Olá! Gostaria de falar sobre (dúvida/parceria/sugestão). Poderiam me ajudar?";
  const whatsappText =
    "Olá! Tenho (dúvida/parceria/sugestão) sobre o Consulta CPNU. Podemos conversar?";

  const mailTo = mailtoLink(contactEmail, emailSubject, emailBody);
  const wa = whatsappLink(contactPhone, whatsappText);

  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto flex flex-col items-center gap-8 px-4">
        {/* Cabeçalho / texto introdutório */}
        <header className="max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>
          <p className="mt-3 text-gray-400">{blurb}</p>
        </header>

        {/* Duas caixas: WhatsApp e E-mail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Caixa WhatsApp */}
          <div className="flex flex-col justify-between gap-4 bg-gray-800 rounded-lg border border-gray-700/50 p-6 shadow-lg">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 w-full justify-center">
                <FaWhatsapp aria-hidden />
                <h3 className="text-xl font-semibold text-white">WhatsApp</h3>
              </div>
              <p className="mt-2 text-gray-300">
                Atendimento rápido e direto. Fale em tempo real e agilize seu
                contato.
              </p>
            </div>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 transition-colors"
              aria-label="Iniciar conversa pelo WhatsApp"
            >
              <FaWhatsapp />
              Iniciar conversa
            </a>
          </div>

          {/* Caixa E-mail */}
          <div className="flex flex-col justify-between gap-4 bg-gray-800 rounded-lg border border-gray-700/50 p-6 shadow-lg">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 w-full justify-center">
                <FaEnvelope aria-hidden />
                <h3 className="text-xl font-semibold text-white">E‑mail</h3>
              </div>
              <p className="mt-2 text-gray-300">
                Ideal para detalhar solicitações, enviar anexos e formalizar
                demandas.
              </p>
            </div>
            <a
              href={mailTo}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 transition-colors"
              aria-label="Enviar e‑mail"
            >
              <FaEnvelope />
              Enviar e‑mail
            </a>
          </div>
        </div>

        <footer className="text-xs text-gray-500 mt-2 text-center">
          *Ao clicar, abriremos seu aplicativo de e‑mail ou WhatsApp com a
          mensagem pré‑preenchida.
        </footer>
      </div>
    </section>
  );
}