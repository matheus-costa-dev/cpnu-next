from pandas import DataFrame, read_sql
from sqlalchemy import create_engine

class DB:
    def __init__(self, connection_string):
        self.engine = create_engine(connection_string) 

    def get_tbl(self, sql_query,**kwargs):
        """
        Retorna um dataframe do banco de dados
        """
        df = read_sql(sql_query, self.engine, **kwargs)
        return df

    def export_to_db(self, df:DataFrame, tblName,**kwargs):
        """
        Envia um dataframe para o banco de dados com o nome da tabela
        """
        df.to_sql(tblName, self.engine, **kwargs)
        print(f"dados da {tblName} enviado com sucesso")


    def __enter__(self):
        """
        Chamado ao entrar no bloco 'with'.
        Retorna o objeto que será usado na variável 'as'.
        """
        print("ENTRANDO: __enter__ (pronto para usar)")
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        """
        Chamado ao sair do bloco 'with'.
        É aqui que você faz a limpeza.
        """
        print("SAINDO: __exit__ (limpando e fechando engine)")
        self.engine.dispose()
