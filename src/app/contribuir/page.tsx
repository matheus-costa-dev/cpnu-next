import React from 'react'
import PixSection from '@/components/PixSection'
import type { Metadata } from 'next'; 


export const metadata: Metadata = {
  title: 'Apoie o Projeto - Consulta CPNU',
  description: 'Se a nossa ferramenta foi útil para você, considere apoiar o projeto com uma contribuição. Sua ajuda é fundamental para mantermos o site no ar e desenvolvermos novas funcionalidades.',
};

function page() {
    return (
        <PixSection />
    )
}

export default page