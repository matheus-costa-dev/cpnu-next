from cpnu_processor.persistencia import create_views
from cpnu_processor.persistencia import convert_to_csv

sql_createView_vw_cpnu = """
SELECT bloco, orgao, cargo, nome, inscricao, ordem_pref, class_ampla_especifica_atualizada AS class_ampla, class_negra_especifica_atualizada AS class_ppp, class_pcd_especifica_atualizada AS class_pcd, class_indigena_especifica_atualizada AS class_ind FROM tbl_bloco1
UNION ALL
SELECT bloco, orgao, cargo, nome, inscricao, ordem_pref, class_ampla_especifica_atualizada AS class_ampla, class_negra_especifica_atualizada AS class_ppp, class_pcd_especifica_atualizada AS class_pcd, class_indigena_especifica_atualizada AS class_ind FROM tbl_bloco2
UNION ALL
SELECT bloco, orgao, cargo, nome, inscricao, ordem_pref, class_ampla_especifica_atualizada AS class_ampla, class_negra_especifica_atualizada AS class_ppp, class_pcd_especifica_atualizada AS class_pcd, class_indigena_especifica_atualizada AS class_ind FROM tbl_bloco3
UNION ALL
SELECT bloco, orgao, cargo, nome, inscricao, ordem_pref, class_ampla_especifica_atualizada AS class_ampla, class_negra_especifica_atualizada AS class_ppp, class_pcd_especifica_atualizada AS class_pcd, class_indigena_especifica_atualizada AS class_ind FROM tbl_bloco4
UNION ALL
SELECT bloco, orgao, cargo, nome, inscricao, ordem_pref, class_ampla_especifica_atualizada AS class_ampla, class_negra_especifica_atualizada AS class_ppp, class_pcd_especifica_atualizada AS class_pcd, class_indigena_especifica_atualizada AS class_ind FROM tbl_bloco5
UNION ALL
SELECT bloco, orgao, cargo, nome, inscricao, ordem_pref, class_ampla_especifica_atualizada AS class_ampla, class_negra_especifica_atualizada AS class_ppp, class_pcd_especifica_atualizada AS class_pcd, class_indigena_especifica_atualizada AS class_ind FROM tbl_bloco6
UNION ALL
SELECT bloco, orgao, cargo, nome, inscricao, ordem_pref, class_ampla_especifica_atualizada AS class_ampla, class_negra_especifica_atualizada AS class_ppp, class_pcd_especifica_atualizada AS class_pcd, class_indigena_especifica_atualizada AS class_ind FROM tbl_bloco7
UNION ALL
SELECT bloco, orgao, cargo, nome, inscricao, ordem_pref, class_ampla_especifica_atualizada AS class_ampla, class_negra_especifica_atualizada AS class_ppp, class_pcd_especifica_atualizada AS class_pcd, class_indigena_especifica_atualizada AS class_ind FROM tbl_bloco8;
"""

sql_createView_noFilter = """
SELECT * FROM tbl_noFilter_bloco1
UNION ALL
SELECT * FROM tbl_noFilter_bloco2
UNION ALL
SELECT * FROM tbl_noFilter_bloco3
UNION ALL
SELECT * FROM tbl_noFilter_bloco4
UNION ALL
SELECT * FROM tbl_noFilter_bloco5
UNION ALL
SELECT * FROM tbl_noFilter_bloco6
UNION ALL
SELECT * FROM tbl_noFilter_bloco7
UNION ALL
SELECT * FROM tbl_noFilter_bloco8;
"""

sql_createView_vw_tbl_apoio = """
SELECT cod_cargo, orgao, cargo, especialidade FROM tbl_noFilter_bloco1
UNION
SELECT cod_cargo, orgao, cargo, especialidade FROM tbl_noFilter_bloco2
UNION
SELECT cod_cargo, orgao, cargo, especialidade FROM tbl_noFilter_bloco3
UNION
SELECT cod_cargo, orgao, cargo, especialidade FROM tbl_noFilter_bloco4
UNION
SELECT cod_cargo, orgao, cargo, especialidade FROM tbl_noFilter_bloco5
UNION
SELECT cod_cargo, orgao, cargo, especialidade FROM tbl_noFilter_bloco6
UNION
SELECT cod_cargo, orgao, cargo, especialidade FROM tbl_noFilter_bloco7
UNION
SELECT cod_cargo, orgao, cargo, especialidade FROM tbl_noFilter_bloco8
"""

if __name__ == "__main__":
    # create_views("vw_withFilter_cpnu",sql_createView_vw_cpnu)
    # create_views("vw_noFilter_cpnu",sql_createView_noFilter)
    # create_views("vw_tbl_apoio",sql_createView_vw_tbl_apoio)
    # convert_to_csv("cpnu.db","vw_noFilter_cpnu","cpnu.csv")
    convert_to_csv("cpnu.db", "vw_tbl_apoio", "tbl_apoio_cod_cargo.csv")