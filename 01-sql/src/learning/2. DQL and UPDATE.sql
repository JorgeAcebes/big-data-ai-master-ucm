SHOW TABLES;

SELECT * FROM COUNTRY_POPULATIONS;

-- Vemos que hay muchos valores nulos. Vamos a eliminarlos (ojo, otras veces se toman otras medidas)

DELETE FROM COUNTRY_POPULATIONS WHERE POPULATION IS NULL;


DESCRIBE TABLE HUMAN_DEVELOPMENTS;

SELECT GENDER FROM HUMAN_DEVELOPMENTS;

-- Vamos a cambiar GENDER para que aparezca en español

UPDATE HUMAN_DEVELOPMENTS
SET GENDER = 'Mujer' WHERE GENDER = 'Female' 
SET GENDER = 'Hombre' WHERE GENDER = 'Male';

-- Esto de aquí arriba da error. Podemos utilizar "CASE" para hacerlo todo del tirón, menos duplicidad

UPDATE HUMAN_DEVELOPMENTS
SET GENDER = CASE
    WHEN GENDER = 'Female' THEN 'Mujer'
    WHEN GENDER = 'Male' THEN 'Hombre'
END
WHERE GENDER IN ('Female', 'Male'); -- Supongamos que hubiese algo tipo NB. Si no ponemos esta última línea, ese contenido se convertiría en Null


SELECT GENDER FROM HUMAN_DEVELOPMENTS
WHERE GENDER NOT IN ('Hombre', 'Mujer');

-- En este caso podemos ver que no hubiera afectado, pero por si acaso.



DROP TABLE HUMAN_DEVELOPMENTS;
