import unicodedata
import pandas as pd

def remover_acentos(txt:str)->str:
        txt = "".join([c for c in unicodedata.normalize("NFKD", txt) if not unicodedata.combining(c)])
        return txt

def cols_to_numeric(df:pd.DataFrame):
    cols_numericas = ["bloco", "cod_cargo", "ordem_pref","inscricao","nota_final" ,"class_ampla_geral", "class_pcd_geral", "class_negra_geral",
    "class_indigena_geral", "class_ampla_especifica","class_pcd_especifica", "class_negra_especifica", "class_indigena_especifica"]
    df[cols_numericas] = df[cols_numericas].apply(pd.to_numeric)
    return df

def tratar_base(df:pd.DataFrame) -> pd.DataFrame:
        tmp = df.copy()
        tmp = tmp[tmp["interesse"] == "Sim"]

        tmp["class_ampla_especifica_atualizada"] = tmp[~tmp["class_ampla_especifica"].isna()]\
        .groupby("cod_cargo_edital")["class_ampla_especifica"]\
        .rank(method="first")
        tmp["class_negra_especifica_atualizada"] = tmp[~tmp["class_negra_especifica"].isna()]\
        .groupby("cod_cargo_edital")["class_negra_especifica"]\
        .rank(method="first")
        tmp["class_pcd_especifica_atualizada"] = tmp[~tmp["class_pcd_especifica"].isna()]\
        .groupby("cod_cargo_edital")["class_pcd_especifica"]\
        .rank(method="first")
        tmp["class_indigena_especifica_atualizada"] = tmp[~tmp["class_indigena_especifica"].isna()]\
        .groupby("cod_cargo_edital")["class_indigena_especifica"]\
        .rank(method="first")

        tmp = tmp[['orgao', 'bloco', 'cod_cargo',
            'cod_cargo_edital', 'cargo', 'especialidade', 'ordem_pref', 'nome',
            'inscricao', 'nota_final', 'class_ampla_geral', 'class_pcd_geral',
            'class_negra_geral', 'class_indigena_geral', 'class_ampla_especifica',
            'class_pcd_especifica', 'class_negra_especifica',
            'class_indigena_especifica', 'interesse', 'sub_judice',
            'class_ampla_especifica_atualizada','class_negra_especifica_atualizada','class_pcd_especifica_atualizada','class_indigena_especifica_atualizada']]

        return tmp