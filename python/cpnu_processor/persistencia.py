import sqlite3
import pandas as pd
from os.path import join

def export_to_db(dbName:str, tblName:str, df_completed:pd.DataFrame) -> None:
    db_path = f"{dbName}.db"
    with sqlite3.connect(db_path) as conn:
        df_completed.to_sql(
            name=tblName, 
            con=conn, 
            if_exists="replace",
            index=False
        )


def create_views(viewName:str, sql_command:str) -> None:
    sql_command = f"CREATE VIEW {viewName} as {sql_command}"
    with sqlite3.connect("cpnu.db") as conn:
        cursor = conn.cursor()
        cursor.execute(f"DROP VIEW IF EXISTS {viewName}")
        cursor.execute(sql_command)
        conn.commit()


def convert_to_csv(dbName:str, tbl_or_view_name:str, csvName:str) -> None:
    db_path = f"{dbName}.db"
    output_path = join("saidas", csvName)
    with sqlite3.connect(db_path) as conn:
        df = pd.read_sql(f"SELECT * FROM {tbl_or_view_name}", conn)
        df.to_csv(output_path, index=False)

# import pandas as pd
# import sqlite3
# df = pd.read_sql("SELECT * FROM all_cpnu", sqlite3.Connection("cpnu.db"))

# df.to_csv("cpnu.csv", index=False)