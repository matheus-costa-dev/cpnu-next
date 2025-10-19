import sqlite3
import pandas as pd
from os.path import join

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

