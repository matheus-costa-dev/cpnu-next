import pandas as pd
from .processadores.manifestacao_interesse import ManifesacaoInteresse
from .processadores.nomeacoes import Nomeacoes
import logging
from time import sleep

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)



def iterar_manifestacao_interesse() -> pd.DataFrame:
    df_all = pd.DataFrame()
    for bloco in range(1,9):
        interesse = ManifesacaoInteresse(bloco)      
        df_tmp = interesse.routine() 
        df_all = pd.concat([df_all, df_tmp], axis = 0)

    return df_all

def iterar_nomeacoes() -> pd.DataFrame | None:
    df_all = pd.DataFrame()
    try:
        bloco = 1
        delay = 120
        while True:
            if bloco > 8:
                break

            try:
                nomeacoes = Nomeacoes(bloco)
                df_tmp = nomeacoes.loop_untill_fail()
                df_all = pd.concat([df_all, df_tmp], axis=0, ignore_index=True)
                bloco += 1
            except:
                logging.warning(f"a conexão foi cortada pelo servidor, a função será executada novamente dentro de {delay} segundos")
                sleep(delay)
                continue

        
        return df_all
        
    
            
    except Exception as e:
        logging.error(f"O pipeline falhou, houve o seguinte erro:\n{e}", exc_info=True)
    
    return None
