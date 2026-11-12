USE DATABASE MASTER;
USE SCHEMA ONU;

-- EJERCICIOS SELECT y FROM

-- 1. Mostrar todas las filas y columnas de HUMAN_DEVELOPMENTS

SELECT * FROM HUMAN_DEVELOPMENTS; 


-- 2. Mostrar la columna country id, year, gener y esperanza de vida al nacer

SELECT 
    COUNTRY_ID,
    YEAR,
    GENDER, 
    LIFE_EXPECTANCY_AT_BIRTH
FROM HUMAN_DEVELOPMENTS;

-- 3. Mostrar distintos country id de la tabla de poblaciones (1 vez cada country id)

SELECT 
    DISTINCT(COUNTRY_ID)
FROM COUNTRY_POPULATIONS
ORDER BY COUNTRY_ID;

-- 4. Mostrar el country id y población,. Crear un alias y llamarlo población

SELECT
    COUNTRY_ID, 
    POPULATION AS poblacion
FROM COUNTRY_POPULATIONS;



-- EJERCICIOS WHERE

-- 1. Mostrar toda la información de la tabla índice de desarrollo humano para España

SELECT *
FROM HUMAN_DEVELOPMENTS
WHERE COUNTRY_ID = 'ESP';

-- 2. Mostrar los datos de población de españa (ESP) después del 2010

SELECT 
    POPULATION as pop_spain,
    YEAR
FROM COUNTRY_POPULATIONS
WHERE YEAR >2010 AND country_id = 'ESP'
ORDER BY YEAR DESC;

-- 3. Mostrar todos los datos de la tabla de días libres para aquello países que tengan más de 10 festivos nacionales

SELECT *
FROM PAID_DAYS_OFF
WHERE PAID_PUBLIC_HOLIDAYS > 10;

-- 4. Mostrar todos los datos de la tabla de días libres para aquello países que tengan más de 10 festivos nacionales y más de 15 días de vacaciones al año

SELECT *
FROM PAID_DAYS_OFF
WHERE PAID_PUBLIC_HOLIDAYS > 10 AND PAID_LEAVE_DAYS > 15;


-- 5. Mostrar las columnas id, género e índice de desarrollo humano para España y Portugal

SELECT 
    COUNTRY_ID,
    GENDER,
    HUMAN_DEVELOPMENT_INDEX
FROM HUMAN_DEVELOPMENTS
WHERE COUNTRY_ID IN ('ESP', 'PRT');

-- 6. Mostrar los datos de población de España entre 1990 y el 2000

SELECT 
    POPULATION,
    YEAR
FROM COUNTRY_POPULATIONS
WHERE YEAR BETWEEN 1990 AND 2000 AND COUNTRY_ID ='ESP';

-- 7. Mostrar todos los datos de la tabla de índice de desarrollo humano para aquellos países en que el índice no sea nulo.

SELECT * 
FROM HUMAN_DEVELOPMENTS
WHERE HUMAN_DEVELOPMENT_INDEX IS NOT NULL;

-- 8. Mostrar todos los países de la tabla del índice de desarrollo humano para aquellos IDs cuyo nombre empieza por T

SELECT 
    DISTINCT(COUNTRY_ID)
FROM HUMAN_DEVELOPMENTS
WHERE COUNTRY_ID LIKE 'T%';
    


-- EJERCICIOS GROUP BY

-- 1. Obtener la suma de la población mundial en 2020

SELECT 
    SUM(POPULATION)
FROM COUNTRY_POPULATIONS
WHERE YEAR = 2020;


-- 2. Obtener la media de los años esperados de escolarización por países para el año 2020


SELECT 
    COUNTRY_ID,
    AVG(EXPECTED_YEARS_OF_SCHOOLING)
FROM HUMAN_DEVELOPMENTS
WHERE YEAR = 2020
GROUP BY COUNTRY_ID;


-- 3. Obtener la media del índice de desarrollo humano por género entre los años 2000 y 2020

SELECT  
    COUNTRY_ID,
    AVG(HUMAN_DEVELOPMENT_INDEX),
    GENDER,
    YEAR
FROM HUMAN_DEVELOPMENTS
WHERE YEAR BETWEEN 2000 AND 2020
GROUP BY COUNTRY_ID, YEAR, GENDER;


-- 4. Obtener para cada país el mayor índice de desarrollo humano que haya tenido en su historia

CREATE OR REPLACE VIEW MAX_HUMAN_DEV_ID AS
SELECT 
    COUNTRY_ID,
    MAX(HUMAN_DEVELOPMENT_INDEX) AS max_hdi
FROM HUMAN_DEVELOPMENTS 
GROUP BY COUNTRY_ID;


SELECT 
    COUNT(*)
FROM MAX_HUMAN_DEV_ID
WHERE MAX_HDI IS NULL;

-- 4 Bis. Saber para qué año ocurrió ese máximo

SELECT 
    hd.YEAR,
    hd.COUNTRY_ID,
    -- HUMAN_DEVELOPMENT_INDEX, ** comento esta línea porque me saldrán los mismos resultados que MAX_HDI **
    max_hdi
FROM 
    HUMAN_DEVELOPMENTS AS hd
    INNER JOIN
    MAX_HUMAN_DEV_ID as mh
    ON HUMAN_DEVELOPMENT_INDEX = max_hdi AND
    hd.COUNTRY_ID = mh.COUNTRY_ID
ORDER BY max_hdi;

-- 5. Obtener el promedio del índice de desarrollo humano, la esperanza de vida al nacer y la renta per capita, para todas los países entre los años 1990 y 2000

SELECT 
    AVG(HUMAN_DEVELOPMENT_INDEX),
    AVG(LIFE_EXPECTANCY_AT_BIRTH),
    AVG(GROSS_NATIONAL_INCOME_PER_CAPITA),
    COUNTRY_ID
FROM HUMAN_DEVELOPMENTS
WHERE YEAR BETWEEN 1990 AND 2000
GROUP BY COUNTRY_ID;


-- EJERCICIOS ORDER BY

-- 1. Obtener una lista de países, el índice de desarrollo humano y la esperanza de vida al nacer ordenada de manera descendente en función del promedio del índice de desarrollo humano. Filtrar la información para el año 2020 y los valores del HDI nulos

SELECT 
    COUNTRY_ID as PAISES,
    AVG(HUMAN_DEVELOPMENT_INDEX) AS HDI,
    AVG(LIFE_EXPECTANCY_AT_BIRTH) AS esperanza_vida
FROM HUMAN_DEVELOPMENTS
WHERE YEAR = 2020 AND HUMAN_DEVELOPMENT_INDEX IS NOT NULL
GROUP BY COUNTRY_ID
ORDER BY HDI DESC;


-- 2. Obtener una lista con los países y el promedio de los años esperados de escolarización ordenada de manera descendente en base al promedio de los años esperados de escolarización. Filtrar la información para los años 90 y mostrar solo aquellos países cuyos años esperados de escolarización sean menos de 7


SELECT
    COUNTRY_ID as pais,
    AVG(EXPECTED_YEARS_OF_SCHOOLING) AS mean_expected_yos
FROM HUMAN_DEVELOPMENTS
WHERE YEAR BETWEEN 1990 AND 2000
GROUP BY COUNTRY_ID
HAVING mean_expected_yos < 7
ORDER BY mean_expected_yos DESC;



-- 3. Obtener una lista con los países y su promedio de la renta per capita y ordenar el resultado de manera descendente en base al promedio de la renta per capita. Filtrar para los años 2000 y diferenciar el resultado entre hombres y mujeres


SELECT
    COUNTRY_ID,
    AVG(GROSS_NATIONAL_INCOME_PER_CAPITA) AS mean_ipc,
    GENDER
FROM HUMAN_DEVELOPMENTS
WHERE
    YEAR BETWEEN 2000 AND 2009
GROUP BY 
    COUNTRY_ID, GENDER
ORDER BY mean_ipc DESC;

-- 4. Obtener una lista países, promedio de esperanza de vida y promedio de renta per capita ordenada de manera descendente en base a la esperanza de vida. Filtrar la información para los años 2000 y mostrar solo aquellos países cuyo promedio de la renta per capita sea mayor a 45000.



SELECT 
    COUNTRY_ID,
    AVG(LIFE_EXPECTANCY_AT_BIRTH) as mean_life,
    AVG(GROSS_NATIONAL_INCOME_PER_CAPITA) as mean_ipc
FROM HUMAN_DEVELOPMENTS
WHERE YEAR BETWEEN 2000 AND 2009
GROUP BY COUNTRY_ID
HAVING mean_ipc > 45000
ORDER BY mean_life DESC;

-- EJERCICIOS JOIN

-- 1. Realizamos una consulta donde se muestra el país, el género, el índice del desarrollo humano, la esperanza de vida y los días libres al año. Filtramos para el año 2021 y mostramos solo los países en que el índice del desarrollo humano no sea nulo. Mostramos sólo los datos de la tabla del índice de desarrollo humano para aquellos países en que tengamos datos en las dos tablas.


SELECT
    hd.COUNTRY_ID,
    GENDER,
    HUMAN_DEVELOPMENT_INDEX, 
    LIFE_EXPECTANCY_AT_BIRTH, 
    (PAID_LEAVE_DAYS + PAID_PUBLIC_HOLIDAYS) as pdo_tot
FROM
    HUMAN_DEVELOPMENTS as hd 
    INNER JOIN
    PAID_DAYS_OFF as pdo
    ON hd.COUNTRY_ID = pdo.COUNTRY_ID AND
    hd.YEAR = pdo.YEAR
WHERE
    hd.YEAR = 2021 AND
    HUMAN_DEVELOPMENT_INDEX IS NOT NULL;



-- 2. Realizamos una consulta donde se muestra el país, el promedio del índice del desarrollo humano, el promedio de la esperanza de vida y el promedio de la población. Mostramos los valores para los años 90 y solo para aquellos países que tengan un promedio del índice del desarrollo humano mayor de 0.75.


SELECT
    COUNTRY,
    AVG(HUMAN_DEVELOPMENT_INDEX) as mean_hdi,
    AVG(LIFE_EXPECTANCY_AT_BIRTH) as mean_le,
    AVG(POPULATION) as mean_pop
FROM 
    HUMAN_DEVELOPMENTS as hd
    INNER JOIN COUNTRIES as c ON hd.COUNTRY_ID = c.COUNTRY_ID
    INNER JOIN COUNTRY_POPULATIONS as cp ON hd.COUNTRY_ID = cp.COUNTRY_ID
WHERE 
    hd.YEAR BETWEEN 1990 AND 1999
GROUP BY COUNTRY
HAVING mean_hdi > 0.75;
    

-- 3. Realizamos una consulta donde mostramos el país, la región, el promedio de población, el promedio de días libres y el promedio del índice del desarrollo humano. Filtramos para los años más allá del 2000 y el género másculino. Mostramos todos los países de los que tengamos datos en la tabla población aunque no tengamos datos en la tabla de índice de desarrollo humano.

SELECT 
    COUNTRY,
    REGION_ID,
    AVG(POPULATION) as mean_pop,
    AVG(PAID_LEAVE_DAYS + PAID_PUBLIC_HOLIDAYS) as mean_ldo,
    AVG(HUMAN_DEVELOPMENT_INDEX) as mean_hdi
FROM
    COUNTRY_POPULATIONS as p 
    LEFT JOIN HUMAN_DEVELOPMENTS as hd ON 
    hd.COUNTRY_ID = p.COUNTRY_ID AND  hd.YEAR = p.YEAR 
    AND GENDER = 'Male'
    INNER JOIN COUNTRIES as c ON p.COUNTRY_ID = c.COUNTRY_ID
    LEFT JOIN PAID_DAYS_OFF as pdo ON p.COUNTRY_ID = pdo.COUNTRY_ID
WHERE p.YEAR > 2000
GROUP BY COUNTRY, REGION_ID;

-- 4. Creamos una consulta en donde categorizamos los países en base a los siguientes criterios
--    Si el índice de desarrollo humano es mayor que 0.8 y sus días libre son más de 20 “Top Country”
--    Si el índice de desarrollo humano está entre 0.7 y 0.8 y sus días libres son más de 15 “Medium Country”
--    Si el índice de desarrollo humano es menor que 0.7 “Bottom Country”
--    El resto “Other”
--    Mostramos el país, el índice de desarrollo humano, el total de días libres y su categoría. Filtramos los datos para 2021.


SELECT 
    COUNTRY,
    HUMAN_DEVELOPMENT_INDEX,
    (PAID_LEAVE_DAYS + PAID_PUBLIC_HOLIDAYS)  AS total_pdo,
    CASE
        WHEN HUMAN_DEVELOPMENT_INDEX > 0.8 AND total_pdo > 20 THEN 'Top Country'
        WHEN (HUMAN_DEVELOPMENT_INDEX BETWEEN 0.7 AND 0.8) AND total_pdo > 15 THEN 'Medium Country'
        WHEN HUMAN_DEVELOPMENT_INDEX < 0.7 THEN 'Bottom Country'
        ELSE 'Other'
    END AS category
FROM 
    HUMAN_DEVELOPMENTS AS hd 
    INNER JOIN COUNTRIES as c ON c.COUNTRY_ID = hd.country_id
    INNER JOIN PAID_DAYS_OFF as pdo ON pdo.COUNTRY_ID = hd.country_id 
    AND pdo.YEAR = hd.YEAR
WHERE hd.YEAR = 2021;
    
    

-- EJERCICIOS SUB-QUERIES

-- 1. Creamos una consulta donde seleccionamos el país, el género y el promedio del índice de desarrollo humano. Mostramos sólo aquellos países que tengan una población de más 1M en 2021.

SELECT 
    COUNTRY,
    GENDER, 
    AVG(HUMAN_DEVELOPMENT_INDEX) as mean_hdi
FROM HUMAN_DEVELOPMENTS as hd
    INNER JOIN COUNTRIES as c ON c.COUNTRY_ID = hd.COUNTRY_ID
WHERE hd.COUNTRY_ID IN (SELECT COUNTRY_ID FROM COUNTRY_POPULATIONS_2021 WHERE POPULATION > 1000000 AND YEAR = 2021)
GROUP BY COUNTRY, GENDER;


-- 2. Creamos una consulta donde seleccionamos el país, el género y el promedio del índice de desarrollo humano. Mostramos sólo el país con menor número de días libres del planeta.

SELECT  
    COUNTRY,
    GENDER, 
    AVG(HUMAN_DEVELOPMENT_INDEX)
FROM 
    HUMAN_DEVELOPMENTS as hd 
    INNER JOIN COUNTRIES as c ON c.COUNTRY_ID = hd.COUNTRY_ID
    
WHERE hd.COUNTRY_ID IN (SELECT COUNTRY_ID FROM PAID_DAYS_OFF WHERE (PAID_LEAVE_DAYS + PAID_PUBLIC_HOLIDAYS) = (SELECT MIN(PAID_LEAVE_DAYS+PAID_PUBLIC_HOLIDAYS) FROM PAID_DAYS_OFF))
GROUP BY COUNTRY, GENDER;




-- EJERCICIOS VIEWS

-- 1. Creamos una vista con la query que hemos desarrollado en el último ejercicio del apartado de Sub- Queries con el nombre de country_category. Hacemos una query a nuestra vista donde contemos el número de países que tenemos en cada categoría.


CREATE OR REPLACE VIEW country_category AS
SELECT 
    COUNTRY,
    HUMAN_DEVELOPMENT_INDEX,
    (PAID_LEAVE_DAYS + PAID_PUBLIC_HOLIDAYS)  AS total_pdo,
    CASE
        WHEN HUMAN_DEVELOPMENT_INDEX > 0.8 AND total_pdo > 20 THEN 'Top Country'
        WHEN (HUMAN_DEVELOPMENT_INDEX BETWEEN 0.7 AND 0.8) AND total_pdo > 15 THEN 'Medium Country'
        WHEN HUMAN_DEVELOPMENT_INDEX < 0.7 THEN 'Bottom Country'
        ELSE 'Other'
    END AS category
FROM 
    HUMAN_DEVELOPMENTS AS hd 
    INNER JOIN COUNTRIES as c ON c.COUNTRY_ID = hd.country_id
    INNER JOIN PAID_DAYS_OFF as pdo ON pdo.COUNTRY_ID = hd.country_id 
    AND pdo.YEAR = hd.YEAR
WHERE hd.YEAR = 2021;


SELECT
    category,
    COUNT(DISTINCT COUNTRY) AS total_countries
FROM country_category
GROUP BY category
ORDER BY total_countries DESC;




-- EJERCICIOS CASE

-- 1. Creamos una categorización de los datos que identifica el año 2021 como “Current Year”, el año 2020 como “Previous Year” y el resto como “Otros” y mostramos el promedio de índice de desarrollo humano para estos tres años.

SELECT 
    AVG(HUMAN_DEVELOPMENT_INDEX) as mean_hdi,
    CASE 
        WHEN YEAR = 2021 THEN 'Current Year'
        WHEN YEAR = 2020 THEN 'Past Year'
        ELSE 'Others'
    END AS year_category
FROM HUMAN_DEVELOPMENTS
GROUP BY year_category;



-- 2. Creamos una categorización de los datos que identifica los países del G7 como “G7” y el resto de países como “Otros”, hacemos un conteo del número de países y mostramos su promedio del índice de desarrollo humano y su renta per cápita. Filtramos la información para el año 2020 e incluimos los países con el índice de desarrollo humano no es nulo.


SELECT 
    CASE
        WHEN c.COUNTRY_ID IN ('DEU', 'CAN', 'USA', 'FRA', 'ITA', 'JPN', 'GBR') THEN 'G7'
        ELSE 'Others'
    END as category,
    COUNT(DISTINCT hd.COUNTRY_ID) AS conteo, 
    AVG(HUMAN_DEVELOPMENT_INDEX) as mean_hdi,
    AVG(GROSS_NATIONAL_INCOME_PER_CAPITA) as mean_ipc    
FROM HUMAN_DEVELOPMENTS as hd 
    INNER JOIN COUNTRIES as c ON c.COUNTRY_ID = hd.COUNTRY_ID
WHERE YEAR = 2020 AND HUMAN_DEVELOPMENT_INDEX IS NOT NULL
GROUP BY category
ORDER BY category;



-- 3. Creamos una categorización de los datos que identifica los países con una esperanza de vida media mayor que 80 como “Alta” entre 60-80 “Media” y por debajo de 60 baja. Calculamos el promedio del índice de desarrollo humano para estas tres categorías filtrando para el año 2020 y ordenándose en base al índice de manera ascendente.


SELECT 
    CASE 
        WHEN LIFE_EXPECTANCY_AT_BIRTH > 80 THEN 'High'
        WHEN LIFE_EXPECTANCY_AT_BIRTH BETWEEN 60 AND 80 THEN 'Medium'
        ELSE 'Low'
    END as le_category,
    AVG(HUMAN_DEVELOPMENT_INDEX) as mean_hdi
FROM HUMAN_DEVELOPMENTS
WHERE YEAR = 2020
GROUP BY le_category
ORDER BY mean_hdi ASC;



-- EJERCICIOS HAVING

-- 1. Obtener aquellos países y el índice de desarrollo humano para los países cuyo valor mínimo del índice de desarrollo humano esté por encima de 0.7 entre los años 2000 y 2020




CREATE OR REPLACE VIEW  criterion AS
SELECT 
    COUNTRY_ID
FROM HUMAN_DEVELOPMENTS
WHERE YEAR BETWEEN 2000 AND 2020
GROUP BY COUNTRY_ID
HAVING MIN(HUMAN_DEVELOPMENT_INDEX) > 0.7;



SELECT
    COUNTRY,
    HUMAN_DEVELOPMENT_INDEX,
    YEAR
FROM 
    HUMAN_DEVELOPMENTS as hd 
    INNER JOIN COUNTRIES as c ON c.COUNTRY_ID = hd.COUNTRY_ID
WHERE YEAR BETWEEN 2000 AND 2020 AND hd.COUNTRY_ID in (SELECT COUNTRY_ID FROM criterion)
ORDER BY YEAR ASC;




-- 2. Obtener para el género femenino los países y el promedio de los años de escolarización para aquellos países cuyo promedio de los años de escolarización esperados para las mujeres sean mayor de 10 en los años 90


SELECT 
    COUNTRY_ID,
    AVG(EXPECTED_YEARS_OF_SCHOOLING) as mean_eys
FROM HUMAN_DEVELOPMENTS
WHERE YEAR BETWEEN 1990 AND 1999  AND GENDER = 'Female'
GROUP BY COUNTRY_ID
HAVING mean_eys > 10;



-- 3. Obtener los países y la renta per capita para aquellos países cuyo promedio de la renta per capita de los años 90 se mayor a 35000


SELECT  
    COUNTRY_ID, 
    AVG(GROSS_NATIONAL_INCOME_PER_CAPITA) as mean_ipc
FROM HUMAN_DEVELOPMENTS
WHERE YEAR BETWEEN 1990 AND 2000 
GROUP BY COUNTRY_ID 
HAVING AVG(GROSS_NATIONAL_INCOME_PER_CAPITA) >35000;

-- 4. Obtener el promedio por país y género de la esperanza de vida al nacer para aquellos países que tengan un promedio del índice de desarrollo humano menor 0.7 en los años 90.


SELECT
    COUNTRY_ID, 
    GENDER,
    AVG(LIFE_EXPECTANCY_AT_BIRTH) as mean_le
FROM HUMAN_DEVELOPMENTS
WHERE YEAR BETWEEN 1990 AND 1999
GROUP BY COUNTRY_ID, GENDER
HAVING AVG(HUMAN_DEVELOPMENT_INDEX) < 0.7;


-- EJERCICIOS TOP

-- 1. Obtener una lista con los 3 regiones con el mayor promedio de renta per capita para los años 90

SELECT 
    TOP 3 REGION_ID, 
    AVG(GROSS_NATIONAL_INCOME_PER_CAPITA) as mean_ipc
FROM COUNTRIES as c
    INNER JOIN HUMAN_DEVELOPMENTS as hd ON c.COUNTRY_ID = hd.COUNTRY_ID
WHERE YEAR BETWEEN 1990 AND 2000
GROUP BY REGION_ID;

-- 2. Obtener una lista con las 5 países con el mayor promedio de años de escolarización para las mujeres en los años 2000

SELECT 
    TOP 5 COUNTRY_ID, 
    AVG(MEAN_YEARS_OF_SCHOOLING) as mean_yos
FROM HUMAN_DEVELOPMENTS
WHERE GENDER = 'Female' AND YEAR BETWEEN 2000 AND 2009
GROUP BY COUNTRY_ID;

-- EJERCICIOS SET OPERATORS

-- 1. Creamos una tabla donde unimos el resultado de dos consultas:
--    Seleccionamos el id del país y el índice de desarrollo humano para el año 2020
--    Seleccionamos el id del país y la población para el año 2020
--    Indicamos con un literal a que medida corresponde cada registro


SELECT  
    COUNTRY_ID as id,
    'HDI' as kpi,
    HUMAN_DEVELOPMENT_INDEX as value
FROM HUMAN_DEVELOPMENTS
WHERE YEAR = 2020
UNION 
SELECT
    COUNTRY_ID as id,
    'Pop' as kpi,
    POPULATION as value
FROM COUNTRY_POPULATIONS
WHERE YEAR = 2020;




-- 2. Creamos una tabla en que solo mostremos aquellos países que se encuentran en la tabla de población y días libres. Aquellos países que no estén en las dos no los mostramos.

SELECT 
    COUNTRY_ID FROM COUNTRY_POPULATIONS
    INTERSECT
SELECT
    COUNTRY_ID FROM PAID_DAYS_OFF;

-- 3. Creamos una tabla en que solo mostremos aquellos países que no se encuentren en las dos tablas de población y días libres. Solo mostramos los países que no se encuentran en ambas tablas


(SELECT COUNTRY_ID FROM COUNTRY_POPULATIONS
    EXCEPT
SELECT COUNTRY_ID FROM PAID_DAYS_OFF)
UNION
(SELECT COUNTRY_ID FROM PAID_DAYS_OFF
    EXCEPT
SELECT COUNTRY_ID FROM COUNTRY_POPULATIONS);




-- EJERCICIOS WINDOW FUNCTION

-- 1. Creamos una consulta que recoja el país, el género y la diferencia que hay entre el promedio global del índice de desarrollo y el índice de desarrollo humano de cada unos de los países por género.


SELECT  
    COUNTRY_ID, 
    GENDER, 
    AVG(HUMAN_DEVELOPMENT_INDEX) OVER () -
        AVG(HUMAN_DEVELOPMENT_INDEX) OVER (PARTITION BY COUNTRY_ID, GENDER)
FROM HUMAN_DEVELOPMENTS;


-- 2. Crear una consulta que muestre el país, el año y el índice de desarrollo humano (Human Development Index), junto con el promedio del índice de desarrollo humano para ese país a lo largo de todos los años disponibles. Utiliza una función de ventana para calcular el promedio del índice de desarrollo humano por país.

SELECT
    COUNTRY_ID, 
    YEAR, 
    HUMAN_DEVELOPMENT_INDEX,
    AVG(HUMAN_DEVELOPMENT_INDEX) OVER(PARTITION BY COUNTRY_ID) AS mean_hdi_by_country
FROM HUMAN_DEVELOPMENTS;
