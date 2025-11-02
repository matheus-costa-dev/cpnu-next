from io import BytesIO
import requests
import pandas as pd
from .base import Base
import pdfplumber
import logging
from time import sleep

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)


class Nomeacoes(Base):
    def __init__(self, n_bloco:int):
        super().__init__()
        assert isinstance(n_bloco,int), "parametro n_bloco tem de ser um numero"
        assert  1 <= n_bloco <= 8, "parametro n_bloco tem de ser de 1 até 8" 
        self.n_bloco = n_bloco


    def get_tbls(self,res:dict) -> dict:
        """
        a função irá extrair dados da tabela, sendo try_to_extract_text opcional
        Extrai
            * As tabelkas do pdf
        """
        tbls = []
        with pdfplumber.open(BytesIO(res.content)) as pdf:
            for page in pdf.pages:
                tbl = page.extract_table()
                tbls.append(tbl)


        return tbls

    def transform_to_tbl(self, tbl: list) -> pd.DataFrame:
        """
        Transforma uma lista de dados em um pandas DataFrame
        Limpa os nomes das colunas
        remove as linhas de texto que não corresponde a tabela
        """
        df = pd.DataFrame(tbl)
        df.columns = self.padronizar_colunas(df.iloc[1].tolist())
        df = df.iloc[2:]

        return df


    def filter_and_reset_index(self, df:pd.DataFrame) -> pd.DataFrame:
        """
        reseta o index de uma tabela e o descarta
        filtra por linhas que não possuem numero de inscrição
        """
        df.reset_index(drop=True,inplace=True)
        df = df[~(df["numero_de_inscricao"] == "")]
        return df


    def reoder_columns(self, df:pd.DataFrame) -> pd.DataFrame:
        """
        reoderna o dataframe para a ordem correta das colunas
            * colunas para o inicio:  ["bloco", "cod_cargo"]
        """
        cols_to_move = ["bloco", "cod_cargo"]
        new_order_columns = cols_to_move + [col for col in df.columns if not col in cols_to_move]
        df = df[new_order_columns]
        return df
    

    def routine(self, url:str, cod_cargo:int, cols_to_numeric:list[str], cols_to_date:list[str]) -> pd.DataFrame:
        headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }   

        res = requests.get(url, headers=headers,timeout=60)
        if not res.ok:
            logging.error(f"Não existe dados para a url:\n{url}")
            return None
        
        tbls = self.get_tbls(res)

        df_all = pd.DataFrame()
        
        for tbl in tbls:
            df_tmp = self.transform_to_tbl(tbl)
            df_tmp = self.filter_and_reset_index(df_tmp)
            df_all = pd.concat([df_all, df_tmp], axis=0, ignore_index=True)

        df_all["bloco"] = self.n_bloco
        df_all["cod_cargo"] = cod_cargo
        df_all = self.converte_colunas_para_numerico(df_all, cols_to_numeric)
        df_all = self.converter_colunas_para_data(df_all, cols_to_date)
        df_all = self.reoder_columns(df_all)

        return df_all
   

    def get_data_bloco1_7(self, cod_cargo:int) -> pd.DataFrame:
        url = f"https://www.gov.br/gestao/pt-br/concursonacional/resultados/arquivos/28-de-fevereiro/blocos-1-a-7/bloco-{str(self.n_bloco)}-{str(cod_cargo)}.pdf"
        cols_to_numeric = ["nota_final_(nfp)", "discursiva", "c_especificos", "c_gerais", "titulos", "numero_de_inscricao", "prioridade_no_cargo", "classificacao_ac", "classificacao_pcd", "classificacao_negra", "classificacao_indigena"]
        df = self.routine(url, cod_cargo, cols_to_numeric, ["data_de_nascimento"])
        df = self.converter_colunas_para_coluna_json(df, ["c_gerais","c_especificos"])
        return df


    def get_data_bloco8(self, cod_cargo:int) -> pd.DataFrame:
        url = f"https://www.gov.br/gestao/pt-br/concursonacional/resultados/arquivos/28-de-fevereiro/bloco-8/bloco-8-{str(cod_cargo)}.pdf"
        cols_to_numeric = ["nota_final_(nfp)", "prova_objetiva", "redacao","titulos", "numero_de_inscricao", "prioridade_no_cargo", "classificacao_ac", "classificacao_pcd", "classificacao_negra", "classificacao_indigena"]
        df = self.routine(url, cod_cargo, cols_to_numeric, ["data_de_nascimento"]) 
        df.rename(columns={"redacao": "discursiva"}, inplace=True)
        df = self.converter_colunas_para_coluna_json(df, ["prova_objetiva"])

        return df
    

    def loop_untill_fail(self) -> pd.DataFrame:
        """
        Faz um loop de 1 até o numero de docs que o bloco tem, se não existe o doc ele para a execução e informa que não há dados
        junta todas as tabelas em um único dataframe
        retorna o dataframe
        """
        df_all = pd.DataFrame()
        status = True
        i = 1
        while status:
            try:
                cod_cargo =  self.n_bloco*1000 + i
                if cod_cargo == 4009: #atps, ele deve ser obtido através de outra url
                    logging.warning(f"o cod_cargo: {cod_cargo} referente ao atps deve ser extraido de forma própria")
                    i += 1
                    continue
                
                logging.info(f"iniicando processo para cod_cargo {cod_cargo}")
                df_tmp = self.get_data_bloco1_7(cod_cargo) if self.n_bloco <= 7 else self.get_data_bloco8(cod_cargo) 

                if not isinstance(df_tmp, pd.DataFrame):
                    logging.warning(f"Dados não encontrados (retornou None) para o cod_cargo: {cod_cargo}")
                    status = False
                
                df_all = pd.concat([df_all, df_tmp], axis=0, ignore_index=True)
                i += 1
                
                
            except Exception as error:
                raise logging.error(error)
            finally:
                logging.info(f"finalizando processo para cod_cargo {cod_cargo}")


        return df_all

    