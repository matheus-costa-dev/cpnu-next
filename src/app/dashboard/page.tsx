
import Dashboard from '@/components/Dashboard';
import type { Metadata } from 'next'; 


export const metadata: Metadata = {
  title: 'Dashboard Interativo - Consulta CPNU',
  description: 'Explore os dados do Cadastro de Reserva do CPNU de forma visual. Filtre por cargo, bloco e analise as classificações com nossos dashboards interativos.',
  keywords: 'Dashboard CPNU, Análise de Dados CPNU, Gráficos Concurso, DataViz CPNU',
};


export default function DashboardsPage() {
  return (
    <Dashboard />
  );
}
