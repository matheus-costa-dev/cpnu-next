import React from 'react'
import type { Metadata } from 'next';
import About from '@/components/About';

export const metadata: Metadata = {
  title: 'Perguntas Frequentes (FAQ) - Consulta CPNU',
  description: 'Tire suas dúvidas sobre o Consulta CPNU. Entenda como os dados são calculados, a origem das informações e o objetivo do nosso projeto.',
};


function page() {
  return (
    <div className='py-10 container mx-auto'>
      <About />
    </div>
  )
}

export default page