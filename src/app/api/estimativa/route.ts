// app/api/estimativas/route.ts
import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET(
    request: NextRequest,
) {
  

  const cod_cargo = request.nextUrl.searchParams.get("cod_cargo")
  const sql = neon(process.env.NEON_CONNECTION_STRING!); // Use "!" se tiver certeza que a env existe
  const rows = await sql`SELECT * FROM vw_estimativa WHERE cod_cargo = ${cod_cargo}`; // sua query aqui

//   console.log(rows)
  return NextResponse.json({
    mensagem: "consulta sucesso",
    data: rows
  },
{status: 200});
}