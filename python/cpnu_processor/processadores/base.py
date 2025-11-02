
from unidecode import unidecode
from pandas import DataFrame, to_numeric, to_datetime
import numpy as np

class Base():
    def padronizar_colunas(self, cols:list) -> list:
        cols_limpas = []
        for col in cols:
            col_limpa = col.strip().lower().replace("\n", "_").replace(" ","_").replace("(", "_").replace(")","_")
            if col_limpa.endswith(".") or col_limpa.endswith("?") or col_limpa.endswith("_"):
                col_limpa = col_limpa[:-1]
            col_limpa = col_limpa.replace(".","_").replace("?","_").replace("__","_")
            col_limpa = unidecode(col_limpa)
            cols_limpas.append(col_limpa)

        return cols_limpas

    def converte_colunas_para_numerico(self, df: DataFrame, cols:list) -> DataFrame: 
        """
        Converte as colunas para o tipo corretos delas e troca a , por . na coluna tipo float.
        As listas de colunas devem ser passadas como argumentos de palavra-chave, ex:
        float=["nota_final", ...], int=["inscricao", ...]
        """
        df = df.copy()
        for col in cols:
            if df[col].dtype == "object":
                df[col] = df[col].astype(str).str.replace(",",".")

        df[cols] = df[cols].apply(to_numeric, errors="coerce")

        return df

    def converter_colunas_para_data(self, df:DataFrame, cols_to_convert: list[str]) -> DataFrame:
        df = df.copy()
        for col in cols_to_convert:
            df[col] = df[col].str.replace(" ","")
        
        df[cols_to_convert] = df[cols_to_convert].apply(to_datetime, format="%d/%m/%Y")
        return df
    
    def padronizar_valores_binomial(self,df,col,value_from, value_to):
        df = df.copy()
        df[col] = df[col].str.replace(value_from, value_to)
        return df
    
    def converter_colunas_para_coluna_json(self,df:DataFrame ,keys:list[str]) -> DataFrame:
        df = df.copy()
        
        df["dados_especificos"] = df.apply(lambda col: {
            key: col[key] for key in keys
        }, axis=1)

        df.drop(keys, axis=1, inplace= True)
        return df

   