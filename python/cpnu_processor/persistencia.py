import sqlite3
import pandas as pd
import psycopg2
from os.path import join
from os import getenv
from sqlalchemy import create_engine
from dotenv import load_dotenv



def export_to_db(dbName:str, tblName:str, df:pd.DataFrame) -> None:
    with sqlite3.connect(dbName) as conn:
        df.to_sql(
            name=tblName, 
            con=conn, 
            if_exists="replace",
            index=False
        )


def create_views(dbName: str,viewName:str, sql_command:str) -> None:
    sql_command = f"CREATE VIEW {viewName} as {sql_command}"
    with sqlite3.connect(dbName) as conn:
        cursor = conn.cursor()
        cursor.execute(f"DROP VIEW IF EXISTS {viewName}")
        cursor.execute(sql_command)
        conn.commit()


def convert_to_csv(dbName:str, tbl_or_view_name:str, csvName:str) -> None:
    output_path = join("saidas", csvName)
    with sqlite3.connect(dbName) as conn:
        df = pd.read_sql(f"SELECT * FROM {tbl_or_view_name}", conn)
        df.to_csv(output_path, index=False)

def transfer_tbl_to_neonDB(tblName:str):
    df = pd.read_sql(f"SELECT * FROM {tblName}" ,sqlite3.connect("cpnu.db"))

    load_dotenv("../.env.local")
    NEON_CONNECTION_STRING = getenv("NEON_CONNECTION_STRING")

    if not NEON_CONNECTION_STRING:
        raise Exception("Não existe a variavel NEON_CONNECTION_STRING no arquivo .env")
    
    engine = None
    try:
        engine = create_engine(NEON_CONNECTION_STRING)
        df.to_sql(tblName, engine, if_exists="replace", index=False)

        print(f"dados da {tblName} enviado com sucesso")

    except:
        raise Exception(psycopg2.errors)

    finally:
        if engine:
            engine.dispose()
        print("Finalizando tarefa.")
