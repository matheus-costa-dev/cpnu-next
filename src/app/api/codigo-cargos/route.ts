import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";


export async function GET(
) {

    if (!process.env.NEON_CONNECTION_STRING) {
        throw new Error("A variável de ambiente NEON_CONNECTION_STRING não está configurada.")
    }

    const sql = neon(process.env.NEON_CONNECTION_STRING)
    const rows = await sql `SELECT cod_cargo FROM cargos;`
    const valores = rows.map(row => row.cod_cargo).sort()

    return NextResponse.json({data: valores}, { status: 200 })
}