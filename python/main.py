# from cpnu_processor.pipelines import Pipelines
# from dotenv import load_dotenv
# from os import getenv

# load_dotenv("../.env.local")
# connection_string = getenv("NEON_CONNECTION_STRING")

# pipeline = Pipelines(connection_string, "nomeacoes")
# pipeline.nomeacoes()


from cpnu_processor.processadores.base import Base
from cpnu_processor.persistencia import DB
from dotenv import load_dotenv
from os import getenv
import pandas as pd

load_dotenv("../.env.local")
connection_string = getenv("NEON_CONNECTION_STRING")
db = DB(connection_string)
obj = Base(1)


df = db.get_tbl("SELECT * FROM manifestacoes_interesse")
df["sub_judice"].value_counts()
df[["interesse", "sub_judice"]] = df[["interesse", "sub_judice"]].apply(lambda data: data == "Sim")
db.export_to_db(df, "manifestacoes_interesse", if_exists="replace",index=False)