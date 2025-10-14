// arquivo: src/app/api/situacao/[inscricao]/route.ts

import { NextRequest, NextResponse } from "next/server"; 
import path from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ inscricao: string }> }
) {
    const { inscricao } = await context.params;
    const n_inscricao = parseInt(inscricao, 10);

    
    if (isNaN(n_inscricao) || inscricao.length !== 10) {
        return NextResponse.json({ mensagem: "Número de inscrição inválido ou com tamanho incorreto." }, { status: 400 });
    }

    let db;

    try {
        const dbPath = path.join(process.cwd(), "cpnu.db");

        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
            mode: sqlite3.OPEN_READONLY,
        });

        const sql_query = `
            SELECT 
                orgao,
                cargo,
                ordem_pref,
                class_ampla,
                class_ppp,
                class_pcd,
                class_ind
            FROM
                vw_cpnu
            WHERE
                inscricao = ?
            ORDER BY ordem_pref ASC;
        `;

     
        const rows = await db.all(sql_query, [n_inscricao]);


        if (rows.length === 0) {
            return NextResponse.json({ mensagem: "Número de inscrição não encontrado", data: [] }, { status: 404 });
        }

        return NextResponse.json({
            mensagem: "Dados encontrados.",
            data: rows 
        }, { status: 200 });

    } catch (error) {
        let errorMessage = "Ocorreu um erro desconhecido";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        console.error('Erro na API:', errorMessage);
        return NextResponse.json({ mensagem: 'Erro interno do servidor.', details: errorMessage }, { status: 500 });

    } finally {
       
        if (db) {
            await db.close();
        }
    }
}