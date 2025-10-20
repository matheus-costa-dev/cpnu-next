// arquivo: src/app/api/situacao/[inscricao]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ inscricao: string }> }
) {
    const { inscricao } = await context.params;
    const n_inscricao = parseInt(inscricao, 10);


    if (isNaN(n_inscricao) || inscricao.length !== 10) {
        return NextResponse.json({ mensagem: "Número de inscrição inválido ou com tamanho incorreto." }, { status: 400 });
    }

    try {

        if (!process.env.NEON_CONNECTION_STRING) {
            throw new Error("A variável de ambiente NEON_CONNECTION_STRING não está configurada.")
        }

        const sql = neon(process.env.NEON_CONNECTION_STRING)
    

        const rows = await sql `
            SELECT 
                inscricao,
                orgao,
                cargo,
                especialidade,
                ordem_pref,
                class_ampla,
                class_ppp,
                class_pcd,
                class_indigena
            FROM
                vw_man_interesse
            WHERE
                inscricao = ${n_inscricao}
            ORDER BY ordem_pref ASC;
        `;

        if (rows.length === 0) {
            return NextResponse.json(
                { mensagem: "Número de inscrição não encontrado ou sem manifestação de interesse.", data: [] },
                { status: 404 }
            );
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
        console.error('Erro na API Route:', errorMessage);
        return NextResponse.json(
            { mensagem: 'Erro interno do servidor.', details: errorMessage },
            { status: 500 }
        );
    }


}