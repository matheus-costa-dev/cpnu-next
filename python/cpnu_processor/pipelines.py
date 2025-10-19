from cpnu_processor.iterate import loop_all_blocks
from cpnu_processor.persistencia import export_to_db

def executar_pipenline_mainfestacao_interesse(export:bool, dbName: str , tblName: str ):
    df = loop_all_blocks()
    if export:
        export_to_db(dbName, tblName, df)

    return df