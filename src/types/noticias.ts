export interface Noticia {
  id: string;
  titulo: string;
  data: string;
  conteudo: {
    raw: unknown; // Hygraph rich text
  };
}
