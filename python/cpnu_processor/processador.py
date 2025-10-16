import pandas as pd
from os.path import join
# Supondo que os arquivos estão na mesma pasta (pacote)
from .utils import remover_acentos, cols_to_numeric, tratar_base
from .persistencia import export_to_db

class ProcessadorCPNU():
    def __init__(self, n_bloco:int):
        assert isinstance(n_bloco,int), "parametro n_bloco tem de ser um numero"
        assert  1 <= n_bloco <= 8, "parametro n_bloco tem de ser de 1 até 8" 
        self.n_bloco = n_bloco

    def obter_dados(self) -> pd.DataFrame:
        fileName = join("dados", f"bloco-{self.n_bloco}.xlsx")
        df = pd.read_excel(fileName)
        df.columns = df.iloc[0]
        df = df.iloc[1:]     
        return df
    
    def tratar_colunas(self, df:pd.DataFrame) -> pd.DataFrame:
        # Criar uma cópia para evitar SettingWithCopyWarning
        df = df.copy()
        cols = [ col.strip().replace(" ","_").replace("?","").replace("\n","_").replace(".","").lower() for col in df.columns]
        cols = [remover_acentos(col) for col in cols]
        cols[10:18]= ["class_ampla_geral", "class_pcd_geral", "class_negra_geral", "class_indigena_geral", "class_ampla_especifica", "class_pcd_especifica", "class_negra_especifica", "class_indigena_especifica"]
        df.columns = cols
        df = cols_to_numeric(df)
        return df
    
    def separate_tables(self, df:pd.DataFrame) -> dict:
        dfs = {grupo: dados for grupo, dados in df.groupby("orgao")}
        return dfs
    

    def aplicando_tratamento(self, dfs:dict) -> dict:
        dfs_tratados = {key: tratar_base(df) for key, df in dfs.items()}
        return dfs_tratados
    

    def juntando_dados(self, dfs_tratados: dict) -> pd.DataFrame:
        lista_de_dfs = list(dfs_tratados.values())
        df_completed = pd.concat(lista_de_dfs, axis=0, ignore_index=True)
        return df_completed
    
    def routine(self) -> pd.DataFrame:
        df = self.obter_dados()
        df_tratado = self.tratar_colunas(df)
        dfs = self.separate_tables(df_tratado)
        dfs_tratados = self.aplicando_tratamento(dfs)
        df_completed = self.juntando_dados(dfs_tratados)
        return df_completed

    def routine_with_export(self, tblName:str) -> None:
        df_completed = self.routine()
        export_to_db(dbName="cpnu", tblName=tblName, df_completed=df_completed)

    def routine_with_export_without_transform(self, tblName:str) -> None:
        df = self.obter_dados()
        df_tratado = self.tratar_colunas(df)
        export_to_db(dbName="cpnu", tblName=tblName, df_completed=df_tratado)