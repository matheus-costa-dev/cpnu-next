from cpnu_processor.processador import ProcessadorCPNU

def executar_pipeline_completo():
    """
    Executa o pipeline de ETL para todos os blocos do CPNU.
    """
    print("--- INICIANDO PROCESSAMENTO GERAL DO CPNU ---")
    
    # Você pode fazer um loop para processar todos os blocos
    for n_bloco in range(1, 9):
        try:
            print(f"\nProcessando Bloco {n_bloco}...")
            processador = ProcessadorCPNU(n_bloco=n_bloco)
            processador.routine_with_export(tblName=f"tbl_bloco{n_bloco}")
            processador.routine_with_export_without_transform(tblName=f"tbl_noFilter_bloco{n_bloco}")
            print(f"Bloco {n_bloco} finalizado e exportado com sucesso!")
        except FileNotFoundError:
            print(f"AVISO: Arquivo para o Bloco {n_bloco} não encontrado. Pulando.")
        except Exception as e:
            print(f"ERRO ao processar o Bloco {n_bloco}: {e}")

    print("\n--- PROCESSAMENTO GERAL FINALIZADO ---")

if __name__ == "__main__":
    executar_pipeline_completo()