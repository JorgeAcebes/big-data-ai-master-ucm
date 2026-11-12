-- ====== ADVANCED QUERIES ==========

USE DATABASE MASTER;
USE SCHEMA ONU;

-- TOP



SELECT 
    TOP 3 HUMAN_DEVELOPMENT_INDEX AS top3hdi,
    COUNTRY_ID,
    YEAR,
    GENDER
FROM HUMAN_DEVELOPMENTS
WHERE HUMAN_DEVELOPMENT_INDEX IS NOT NULL
ORDER BY top3hdi DESC;



-- - CASE

-- ID, Año y género con una columna que indique ALTO/MEDIO/BAJO según el valor de HDI

CREATE OR REPLACE VIEW vista_resumen AS
SELECT
    COUNTRY_ID,
    HUMAN_DEVELOPMENT_INDEX as hdi,
    YEAR,
    GENDER, 
    CASE
        WHEN HUMAN_DEVELOPMENT_INDEX IS NULL THEN 'No está registrado'
        WHEN HUMAN_DEVELOPMENT_INDEX <0 OR
             HUMAN_DEVELOPMENT_INDEX > 1 THEN 'Valor erróneo'
        WHEN HUMAN_DEVELOPMENT_INDEX < 0.25 THEN 'Low'
        WHEN HUMAN_DEVELOPMENT_INDEX < 0.75 THEN 'Medium'
            ELSE 'High'
    END AS HDI_level
FROM HUMAN_DEVELOPMENTS;


SELECT * 
FROM VISTA_RESUMEN
WHERE 
    HDI_LEVEL='No está registrado' or 
    HDI_LEVEL='High';


SELECT 
    AVG(hdi)
FROM VISTA_RESUMEN;

SELECT 
    AVG(hdi),
    country_id,
    gender,
    year
FROM VISTA_RESUMEN
WHERE HDI_level='High'
GROUP BY COUNTRY_ID, YEAR, GENDER;



-- Having

-- Obtener las filas de los países y el género que tengan un HDI medio mayor que 0.75

SELECT 
    COUNTRY_ID,
    GENDER,
    ROUND(AVG(HUMAN_DEVELOPMENT_INDEX),2) AS mean_hdi
FROM HUMAN_DEVELOPMENTS
GROUP BY COUNTRY_ID, GENDER
HAVING  mean_hdi > 0.75;




