from .base import Base
import pandas as pd
from os.path import join

class ManifesacaoInteresse(Base):
    def __init__(self, n_bloco:int):
        super().__init__()
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
        df.columns = self.padronizar_colunas(df.columns.tolist())
        cols_limpas = df.columns.tolist()
        cols_renomear = ["class_ampla_geral", "class_pcd_geral", "class_negra_geral", "class_indigena_geral", "class_ampla_especifica", "class_pcd_especifica", "class_negra_especifica", "class_indigena_especifica"]
        cols_limpas[10:18] = cols_renomear
        df.columns = cols_limpas
        cols_numericas = ["bloco", "cod_cargo", "ordem_pref","inscricao","nota_final" ] + cols_renomear
        df = self.converte_colunas_para_numerico(df, cols_numericas)
        return df
    
    def routine(self) -> pd.DataFrame:
        df = self.obter_dados()
        df_tratado = self.tratar_colunas(df)
        df_padronizado = self.padronizar_valores_binomial(df_tratado, "interesse","-","Não")
        return df_padronizado

