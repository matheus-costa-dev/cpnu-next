import { hygraph } from "@/lib/hygraph";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const QUERY = `
  query Noticia($id: ID!) {
    noticia(where: { id: $id }) {
      id
      titulo
      data
      conteudo {
        raw
      }
    }
  }
`;

export default async function NoticiaPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { noticia } = await hygraph.request(QUERY, { id });
  const data_formatada = new Date(noticia.data).toLocaleDateString("pt-BR");
  
  return (
    <div className="min-h-screen w-full text-[#2a2a2a] py-10 px-4 font-serif">
      <div className="max-w-3xl mx-auto rounded-3xl bg-white p-12 shadow-md border border-gray-300">
        <Link href="/noticias" className="flex items-center text-blue-600 hover:underline mb-6">
          <FaArrowLeft className="mr-2" />
          Voltar para Notícias
        </Link>
        <h1 className="text-5xl font-bold mb-6 leading-tight">{noticia.titulo}</h1>
        <p className="text-sm text-gray-600 mb-8 italic">{data_formatada}</p>

        <div className="prose max-w-none prose-headings:font-bold prose-headings:text-black prose-a:text-blue-700 text-wrap">
          <RichText 
            content={noticia.conteudo.raw}
            renderers={{
              h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-bold mb-4">{children}</h2>,
              p: ({ children }) => <p className="mb-3">{children}</p>
            }}
          />

        </div>
      </div>
    </div>
  );
}
