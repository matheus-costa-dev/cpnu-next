from cpnu_processor.iterate import iterar_nomeacoes, iterar_manifestacao_interesse
from cpnu_processor.persistencia import DB
from pandas import DataFrame
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

class Pipelines:
    def __init__(self, connection_string: str, tbl_name: str) -> None:
        self.connection_string = connection_string
        self.tbl_name = tbl_name
        
    def to_db(self, df: DataFrame, **kwargs) -> None:
        with DB(self.connection_string) as engine:
            engine.export_to_db(df, self.tbl_name, **kwargs) 

    def manifestacoes_interesse(self, **kwargs) -> DataFrame | None:
        try:
            df = iterar_manifestacao_interesse()
            self.to_db(df, **kwargs)
            return df
        except Exception as e:
            logging.error(f"O pipeline falhou, houve o seguinte erro:\n{e}", exc_info=True)
        
        return None
            

    def nomeacoes(self, **kwargs ) -> DataFrame | None:
        try:
            df = iterar_nomeacoes(max_bloco=8)
            self.to_db(df, if_exists = "replace",**kwargs)
            return df
        except Exception as e:
            logging.error(f"O pipeline falhou, houve o seguinte erro:\n{e}", exc_info=True)
        
        return None
        
   