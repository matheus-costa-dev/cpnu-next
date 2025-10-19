import pandas as pd
from .processador import ProcessadorCPNU

def loop_all_blocks(with_transform: bool = True) -> pd.DataFrame:
    
    df_all = pd.DataFrame()
    for bloco in range(1,9):
        cpnu_bloco = ProcessadorCPNU(bloco)      
        df_tmp = cpnu_bloco.routine(with_transform) 
        df_all = pd.concat([df_all, df_tmp], axis = 0)

    return df_all
