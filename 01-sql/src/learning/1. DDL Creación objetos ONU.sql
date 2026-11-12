-- ================================
-- DDL Creación de objetos ONU
-- ================================

-- Cuando pongo "--" al inicio, escribo un comentario. También con Ctrl + Ç


-- Crear DATABASE del master

CREATE DATABASE IF NOT EXISTS MASTER;

-- Comprobamos que se ha creado (vemos qué DATABASES tenemos)

SHOW DATABASES;

-- Creamos el SCHEMA del proyecto de la ONU

CREATE SCHEMA IF NOT EXISTS ONU;


SHOW SCHEMAS;

-- Vamos a cambiar de DATABASE, a ver cómo cambian los schemas

USE DATABASE SNOWFLAKE_LEARNING_DB;

SHOW SCHEMAS;

-- Volvemos al DATABASE MASTER, SCHEMA ONU

USE DATABASE MASTER;
USE SCHEMA ONU;


-- Creamos las tablas del proyecto ONU (también se puede hacer mediante la interfaz)

CREATE TABLE IF NOT EXISTS HUMAN_DEVELOPMENTS (
    COUNTRY_ID VARCHAR(10),
    GENDER VARCHAR(255),
    YEAR INT, 
    HUMAN_DEVELOPMENT_INDEX NUMBER(10,2),
    LIFE_EXPECTANCY_AT_BIRTH NUMBER(10,2),
    EXPECTED_YEARS_OF_SCHOOLING NUMBER(10,2),
    MEAN_YEARS_OF_SCHOOLING NUMBER(10,2),
    GROSS_NATIONAL_INCOME_PER_CAPITA NUMBER(10,2)
);


-- Comprobamos que se ha creado 

SHOW TABLES;


-- Vamos a crear una consulta

SELECT * FROM HUMAN_DEVELOPMENTS;

-- De momento está vacía, no le hemOs cargado los datos.

-- Vamos a inspeccionar la tabla

DESCRIBE TABLE HUMAN_DEVELOPMENTS;

-- El resto de las tablas las crearemos mediante la interfaz visual



-- Probamos cómo funciona DROP

DROP TABLE HUMAN_DEVELOPMENTS;

SELECT * FROM HUMAN_DEVELOPMENTS; -- Efectivamente, vemos cómo se ha quedado vacía

-- Revertimos el DROP

UNDROP TABLE HUMAN_DEVELOPMENTS; 

SELECT * FROM HUMAN_DEVELOPMENTS;


-- ------------------- CONTEXTO EN SNOWFLAKE ---------------------

SHOW ROLES;

-- Vamos a revocar todos los roles secundarios

USE SECONDARY ROLES NONE;

-- Vamos a seleccionar un rol que no tenga permisos sobre esta data

USE ROLE PUBLIC; -- Se ve reflejado en la interfaz, mira arriba a la derecha

USE WAREHOUSE SNOWFLAKE_LEARNING_WH;

-- Hacemos la consulta de nuevo 

SELECT * FROM HUMAN_DEVELOPMENTS;

USE DATABASE MASTER;
USE SCHEMA ONU;


SELECT * FROM HUMAN_DEVELOPMENTS;


-- 
USE ROLE ACCOUNTADMIN;


SELECT * FROM COUNTRIES;


-- Podemos ver que la columna que guarda los id's de las regiones se llama REGION y no REGION_ID

SELECT * FROM REGIONS; 


-- Vamos a cambiarlo empleando alter

ALTER TABLE COUNTRIES RENAME COLUMN REGION TO REGION_ID;


DESCRIBE TABLE COUNTRIES; -- Cambiado :)


-- Ahora cambio de nombre el GROSS NATIONAL INCOME PER CAPITA porque es muy largo

ALTER TABLE HUMAN_DEVELOPMENTS RENAME COLUMN GNI_PER_CAPITA TO RPC;


-- Voy a ver qué ocurre si el nombre de mi columna es incorrecto

ALTER TABLE COUNTRIES RENAME COLUMN COUNTRYY_ERROR TO COUNTRY_NOT_ERROR; -- Me lanza un error