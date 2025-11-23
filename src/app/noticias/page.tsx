import { hygraph } from "@/lib/hygraph";
import Link from "next/link";
import type { Noticia } from "@/types/noticias";

const QUERY = `
  query Noticias {
    noticias(where: {status_flag: publicado}, orderBy: data_DESC) {
      id
      titulo
      data
    }
  }
`;

export default async function NoticiasPage() {
  const { noticias } = await hygraph.request<{ noticias: Noticia[] }>(QUERY);

  return (
    <div className="h-full w-full py-20">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Título */}
        <h1 className="text-2xl font-extrabold text-center text-white mb-14 tracking-tight">
          Notícias
        </h1>

        {/* Grid de Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {noticias.map((n: Noticia) => (
            <Link
              key={n.id}
              href={`/noticias/${n.id}`}
              className="group block p-6 rounded-2xl bg-[#1b1c1f] border border-[#2c2d30]
                        shadow-[0_0_25px_-10px_rgba(0,0,0,0.5)]
                        transition-all duration-300 
                        hover:-translate-y-1 hover:shadow-[0_0_35px_-5px_rgba(80,70,255,0.4)]
                        hover:border-indigo-500"
            >
              <h2 className="text-2xl font-semibold text-gray-200 group-hover:text-indigo-400 transition-colors">
                {n.titulo}
              </h2>

              <p className="text-sm text-gray-400 mt-2">
                {new Date(n.data).toLocaleDateString("pt-BR")}
              </p>

              <div className="mt-4 text-indigo-400 font-medium opacity-0 
                              group-hover:opacity-100 transition-opacity">
                Ler mais →
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
