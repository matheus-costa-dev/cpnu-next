from cpnu_processor.pipelines import executar_pipenline_mainfestacao_interesse


if __name__ == "__main__":
    executar_pipenline_mainfestacao_interesse(export=True, dbName = "cpnu.db", tblName= "man_interesse")