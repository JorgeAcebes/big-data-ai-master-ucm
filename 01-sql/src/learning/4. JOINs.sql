USE DATABASE MASTER;
USE SCHEMA ONU;


-- ========= JOIN ==========


-- - Inner Join

-- Nombre del país y su valor de HDI

SELECT 
    COUNTRY,
    YEAR, 
    GENDER,
    HUMAN_DEVELOPMENT_INDEX
FROM 
    HUMAN_DEVELOPMENTS AS hd 
    INNER JOIN 
    COUNTRIES AS c 
    ON hd.COUNTRY_ID = c.COUNTRY_ID;


-- Nombre del país, HDI, población, género y año
SELECT
    hd.COUNTRY_ID,
    HUMAN_DEVELOPMENT_INDEX, 
    POPULATION,
    GENDER,
    hd.YEAR
FROM 
    HUMAN_DEVELOPMENTS as hd
    INNER JOIN
    COUNTRY_POPULATIONS as cp
    ON hd.COUNTRY_ID = cp.COUNTRY_ID 
    AND hd.YEAR = cp.YEAR
ORDER BY YEAR AND HUMAN_DEVELOPMENT_INDEX ASC;


-- HDI, Población, año, género y nombre del país

SELECT
    GENDER,
    HUMAN_DEVELOPMENT_INDEX,
    COUNTRY,
    POPULATION,
    hd.YEAR
FROM HUMAN_DEVELOPMENTS as hd
    INNER JOIN 
    COUNTRIES as c
    ON hd.COUNTRY_ID = c.COUNTRY_ID
    INNER JOIN
    COUNTRY_POPULATIONS as cp
    ON hd.COUNTRY_ID = cp.COUNTRY_ID AND hd.YEAR = cp.YEAR
ORDER BY 3, 5;



-- - Left/Right Join




-- ___________________ ESTO ES COMPUTACIONALMENTE TREMENDAMENTE COSTOSO ___________________
-- SELECT 
--     MAX(hd.YEAR) as max_year_hd,
--     MAX(cp.YEAR) as max_year_cp
-- FROM
--     HUMAN_DEVELOPMENTS as hd,
--     COUNTRY_POPULATIONS as cp;
    

-- ________________ ESTO MUCHO MEJOR ___________________________

SELECT
    (SELECT MAX(YEAR) FROM HUMAN_DEVELOPMENTS) as max_year_hd,
    (SELECT MIN(YEAR) FROM HUMAN_DEVELOPMENTS) as min_year_hd,
    (SELECT MAX(YEAR) FROM COUNTRY_POPULATIONS) as max_year_cp,
    (SELECT MIN(YEAR) FROM COUNTRY_POPULATIONS) as min_year_cp;




-- HDI, Población, año y género para **los años que se encuentren en la tabla de Human_Development**

SELECT 
    hd.COUNTRY_ID,
    hd.YEAR,
    HUMAN_DEVELOPMENT_INDEX,
    POPULATION,
    GENDER
FROM    
    HUMAN_DEVELOPMENTS as hd
    LEFT JOIN
    COUNTRY_POPULATIONS as cp
    ON hd.COUNTRY_ID = cp.COUNTRY_ID AND hd.YEAR = cp.YEAR
ORDER BY 1, 2 ASC;


-- Vemos como empieza en 1990, porque los años de HUMAN_DEVELOPMENT empiezan en 1990, INDISTITNTAMENTE de que los años de Country Population empiecen en 1960




-- HDI, Población, año y género para **los años que se encuentren en la tabla de Country Populations**

SELECT 
    cp.COUNTRY_ID,
    cp.YEAR,
    HUMAN_DEVELOPMENT_INDEX,
    POPULATION,
    GENDER
FROM    
    HUMAN_DEVELOPMENTS as hd
    RIGHT JOIN
    COUNTRY_POPULATIONS as cp
    ON hd.COUNTRY_ID = cp.COUNTRY_ID AND hd.YEAR = cp.YEAR
ORDER BY 1, 2 ASC;


-- Vemos cómo es que lo "forzamos" a traer los países a partir de 1960 pese a que no tenemos información de su HDI hasta 1990


-- - Full Outer Join



-- hdi, Población, Año y Género para TODOS los años. Esto implica que tenemos que poner las columnas coincientes de ambos sitios


SELECT 
    hd.COUNTRY_ID,
    cp.COUNTRY_ID,
    HUMAN_DEVELOPMENT_INDEX as hd,
    POPULATION,
    hd.YEAR,
    cp.YEAR,
    GENDER
FROM
    HUMAN_DEVELOPMENTS as hd 
    FULL OUTER JOIN 
    COUNTRY_POPULATIONS as cp
    ON 
    hd.COUNTRY_ID = cp.COUNTRY_ID AND hd.YEAR = cp.YEAR
ORDER BY 1, 3;

-- Observo que tengo columnas semiduplicadas. Aquí nos es muy útil el uso de COALESCE

SELECT 
    COALESCE(hd.COUNTRY_ID, cp.COUNTRY_ID) AS COUNTRY_ID,
    COALESCE(hd.YEAR, cp.YEAR) as YEAR,
    HUMAN_DEVELOPMENT_INDEX,
    POPULATION,
    IFNULL(GENDER, 'No hay registros') AS Genero
FROM
    HUMAN_DEVELOPMENTS as hd 
    FULL OUTER JOIN 
    COUNTRY_POPULATIONS as cp
    ON 
    hd.COUNTRY_ID = cp.COUNTRY_ID AND hd.YEAR = cp.YEAR
ORDER BY 1, 2;