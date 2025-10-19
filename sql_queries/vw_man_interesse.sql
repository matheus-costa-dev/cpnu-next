DROP VIEW IF EXISTS vw_man_interesse;
CREATE VIEW vw_man_interesse as
WITH RANKEDANDFILTERED as (
SELECT 
    cod_cargo,
    inscricao,
    ordem_pref,
    CASE
        WHEN class_ampla_especifica IS NOT NULL THEN
            ROW_NUMBER() OVER (PARTITION BY cod_cargo, (class_ampla_especifica IS NOT NULL)
            ORDER BY class_ampla_especifica ASC)
        ELSE NULL
    END AS class_ampla,
    CASE
        WHEN class_negra_especifica IS NOT NULL THEN
            ROW_NUMBER() OVER (PARTITION BY cod_cargo, (class_negra_especifica IS NOT NULL)
            ORDER BY class_negra_especifica ASC)
        ELSE NULL
    END AS class_ppp,
    CASE
        WHEN class_pcd_especifica IS NOT NULL THEN
            ROW_NUMBER() OVER (PARTITION BY cod_cargo, (class_pcd_especifica IS NOT NULL)
            ORDER BY class_pcd_especifica ASC)
        ELSE NULL
    END AS class_pcd,
    CASE
        WHEN class_indigena_especifica IS NOT NULL THEN
            ROW_NUMBER() OVER (PARTITION BY cod_cargo, (class_indigena_especifica IS NOT NULL)
            ORDER BY class_indigena_especifica ASC)
        ELSE NULL
    END AS class_indigena
FROM
    man_interesse
WHERE
    interesse = 'Sim'
) 
SELECT 
    ranked.inscricao,
    apoio.orgao,
    apoio.cargo,
    apoio.especialidade,
    ranked.ordem_pref,
    ranked.class_ampla,
    ranked.class_ppp,
    ranked.class_pcd,
    ranked.class_indigena
FROM RANKEDANDFILTERED as ranked
JOIN tbl_apoio_cod_cargo as apoio
ON ranked.cod_cargo = apoio.cod_cargo;
