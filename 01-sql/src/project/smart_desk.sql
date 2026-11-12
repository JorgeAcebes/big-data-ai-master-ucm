/* =========================================================
TAREA FINAL - BASES DE DATOS SQL
CASO: SMART DESK

Alumno: Jorge Acebes Hernández
========================================================= */


/* =========================================================
CONFIGURACIÓN DEL CONTEXTO
========================================================= */

-- Seleccionar base de datos y esquema
USE DATABASE MASTER;
USE SCHEMA SMART_DESK;

-- Exploración inicial de las tablas
SELECT * FROM ACCOUNTS;
SELECT * FROM SALES;
SELECT * FROM FORECASTS;
SELECT * FROM TARGETS;



/* =========================================================
CONSULTAS
========================================================= */


/* ---------------------------------------------------------
1. Análisis de Ventas y Beneficio por Categoría de Producto
--------------------------------------------------------- */

-- La dirección comercial necesita un análisis detallado del desempeño de la cuenta Adabs
-- Entertainment durante el año 2020. Se requiere un desglose completo por categoría de producto
-- que incluya todas las líneas de ingreso (mantenimiento, producto, partes y soporte), las unidades
-- vendidas y el beneficio generado.

SELECT
    CATEGORY as "Categoría",
    ROUND(SUM(PRODUCT),2) as "Producto",
    ROUND(SUM(PARTS),2) as "Partes",
    ROUND(SUM(MAINTENANCE),2) as "Mantenimiento",
    ROUND(SUM(SUPPORT),2) as "Soporte",
    ROUND(SUM(TOTAL),2) as "Total Ingresos",
    SUM(UNITS_SOLD) as "Unidades Vendidas",
    ROUND(SUM(PROFIT),2) as "Beneficio Total"
FROM SALES
WHERE YEAR = 2020 AND ACCOUNT = 'Adabs Entertainment'
GROUP BY CATEGORY 
ORDER BY "Beneficio Total" DESC;


/* ---------------------------------------------------------
2. Comparación de Rendimiento por País en Regiones APAC y EMEA
--------------------------------------------------------- */


-- El departamento de expansión internacional requiere comparar el rendimiento medio diario de los
-- países pertenecientes a APAC y EMEA. Para evitar que los países con más registros queden
-- sobrerrepresentados, primero deberás consolidar las ventas por fecha, región y país y, a
-- continuación, calcular sus promedios diarios. Este análisis permitirá identificar mercados con mayor
-- actividad habitual y establecer benchmarks regionales comparables.


-- CTE 1: Granularidad diaria por país para evitar sesgo muestral por volumen transaccional
WITH total_diario as (
    SELECT 
        a.REGION,
        a.COUNTRY,
        SUM(s.TOTAL) as tot_ingreso_dia,
        SUM(s.UNITS_SOLD) as tot_unidades_dia,
        SUM(s.PROFIT) as tot_profit_dia  
    FROM 
        ACCOUNTS as a
        INNER JOIN 
        SALES as s ON a.ACCOUNT = s.ACCOUNT
    WHERE a.REGION in ('APAC', 'EMEA')
    GROUP BY REGION, COUNTRY, DATE
)   
-- Promedios diarios normalizados por país y región
SELECT
    REGION as "Región",
    COUNTRY as "País",
    ROUND(AVG(tot_ingreso_dia),2) as "Ingreso Diario Promedio",
    ROUND(AVG(tot_unidades_dia),2) as "Unidades Vendidas Diarias Promedio",
    ROUND(AVG(tot_profit_dia),2) as "Beneficio Diario Promedio"
FROM total_diario
GROUP BY REGION, COUNTRY
ORDER BY REGION ASC, "Beneficio Diario Promedio" DESC;
    



/* ---------------------------------------------------------
3. Análisis del Beneficio Total por Industria
Estudio de Clientes en Etapa de Compromiso
--------------------------------------------------------- */


-- El equipo de ventas estratégicas necesita identificar qué industrias han generado más beneficio
-- histórico entre las cuentas que actualmente tienen oportunidades en etapa Commit. Primero,
-- selecciona las cuentas cuyo importe total de FORECAST para 2022 en etapa Commit supere
-- 500.000 $. Después, calcula el beneficio histórico acumulado en SALES para cada industria.
-- Clasifica el resultado como Alto cuando el beneficio de la industria supere 1.000.000 $, o Normal en
-- caso contrario.


-- Filtro todas las cuentas en etapa Commit del año 2022 cuyo importe total supere los 500k 
WITH accounts_forecast_commit_over_500k as (
    SELECT  
        ACCOUNT
    FROM 
        FORECASTS
    WHERE 
        PREDICTION_CATEGORY = 'Commit' AND
        YEAR = 2022
    GROUP BY ACCOUNT
    HAVING(SUM(FORECAST)  > 500000)
)
-- Beneficio histórico acumulado por industria de las cuentas filtradas y clasificación
SELECT 
    a.INDUSTRY as "Industria",
    ROUND(SUM(s.PROFIT),2) as "Beneficio Total Acumulado",
    CASE
        WHEN "Beneficio Total Acumulado" > 1000000 THEN 'Alto'
        ELSE 'Normal'
    END as "Clasificación del Beneficio"
FROM 
    accounts_forecast_commit_over_500k as afc
    INNER JOIN ACCOUNTS as a ON afc.ACCOUNT = a.ACCOUNT
    INNER JOIN SALES as s ON afc.ACCOUNT = s.ACCOUNT
GROUP BY a.INDUSTRY
ORDER BY "Beneficio Total Acumulado" DESC;






/* ---------------------------------------------------------
4. Análisis Trimestral Real vs Target (2019–2021)
--------------------------------------------------------- */

-- La dirección financiera quiere evaluar el desempeño histórico de Smart Desk comparando los
-- resultados reales con los objetivos de TARGETS. Aunque SALES tiene granularidad diaria, la
-- comparación debe realizarse al nivel común de año y trimestre. Agrega primero las ventas y el
-- beneficio de SALES por YEAR y QUARTER y después une ese resultado con TARGETS para los
-- años 2019, 2020 y 2021. Debes mostrar:
-- ● El sumatorio de ventas reales
-- ● El sumatorio del beneficio real
-- ● El target de ventas del trimestre
-- ● El target de beneficio del trimestre
-- ● La desviación entre resultado real y target


-- CTE 1: Granularidad trimestral del beneficio e ingresos
WITH quarters_sales as (
    SELECT 
        YEAR, 
        QUARTER,
        ROUND(SUM(TOTAL),2) as tot_ingresos,
        ROUND(SUM(PROFIT),2) as tot_profit
    FROM SALES
    WHERE YEAR IN (2019, 2020, 2021)
    GROUP BY YEAR, QUARTER
)
-- Unión con TARGET y cálculo de métricas
SELECT 
    qs.YEAR as "Año",
    qs.QUARTER as "Trimestre",
    qs.tot_ingresos as "Total Ventas Reales", 
    qs.tot_profit as "Total Beneficios Reales", 
    t.TARGET_TOTAL as "Total Ventas Target",
    t.TARGET_PROFIT as "Total Beneficios Target",
    ROUND( (qs.tot_ingresos -  t.TARGET_TOTAL), 2) as "Variación Ventas",
    ROUND( (qs.tot_profit - t.TARGET_PROFIT), 2) as "Variación Beneficios",
    -- Se divide entre el TARGET ya que medimos la desviación sobre lo esperado. 
    ROUND( (qs.tot_ingresos -  t.TARGET_TOTAL)*100/t.TARGET_TOTAL, 2) as "% Variación Ventas", 
    ROUND( (qs.tot_profit - t.TARGET_PROFIT)*100/t.TARGET_PROFIT, 2) as "% Variación Beneficios"   
FROM 
    quarters_sales as qs
    INNER JOIN 
    TARGETS as t ON qs.YEAR = t.YEAR AND qs.QUARTER = t.QUARTER_OF_YEAR
ORDER BY qs.YEAR ASC, qs.QUARTER ASC;


/* =========================================================
CASO PRÁCTICO: Categorías catalizadoras de entrada, tasa de transición y evaluación de Forecasts
========================================================= */

/* ---------------------------------------------------------
1. Pregunta de Negocio
--------------------------------------------------------- */

-- ¿La compra recurrente entre múltiples categorías de productos favorece la adherencia de una cuenta o,
-- por el contrario, canibaliza el gasto presupuestario, resultando en un peor margen?

/* ---------------------------------------------------------
2. Análisis Exploratorio
--------------------------------------------------------- */
-- Comportamiento clientes según el número total de categorías compradas

-- CTE: Métricas y rentabilidad por cuenta
WITH datos_cuentas_por_numero_categoria as (
    SELECT 
        ACCOUNT,
        COUNT(DISTINCT CATEGORY) as numero_categorias,
        COUNT(DISTINCT DATE) as total_dias_compras,
        COUNT(*) as total_compras,
        SUM(UNITS_SOLD) as unidades_vendidas,
        SUM(TOTAL) as total_ingreso,
        SUM(PROFIT) as total_beneficio
    FROM SALES
    GROUP BY ACCOUNT
)
-- Agrupación por número de categorías
SELECT 
    numero_categorias,
    COUNT(ACCOUNT) as cuentas_totales,
    ROUND(COUNT(ACCOUNT) * 100.0 / SUM(COUNT(ACCOUNT)) OVER (), 2) as porcentaje_cuentas,
    ROUND(AVG(total_beneficio), 2) as media_beneficio_por_cuenta,
    ROUND(AVG(total_ingreso), 2) as media_ingreso_por_cuenta,
    ROUND(AVG(total_beneficio / NULLIF(total_ingreso, 0)) * 100, 2) as porcentaje_margen_beneficio
FROM datos_cuentas_por_numero_categoria
GROUP BY numero_categorias
ORDER BY numero_categorias DESC;




-- Categoría de Entrada y Tasa de Expansión Multicategoría

-- CTE 1: Identifico la primera compra de cada cuenta
WITH primera_compra as (
    SELECT 
        ACCOUNT,
        CATEGORY as categoria_entrada,
        DATE,
        ROW_NUMBER() OVER (PARTITION BY ACCOUNT ORDER BY DATE ASC) as rn
    FROM SALES
),
-- CTE 2: Evaluo el ciclo de vida posterior de la cuenta
evolucion_cuenta as (
    SELECT 
        pc.ACCOUNT,
        pc.categoria_entrada,
        COUNT(DISTINCT s.CATEGORY) as total_categorias
    FROM primera_compra as pc
    INNER JOIN SALES s ON pc.ACCOUNT = s.ACCOUNT
    WHERE pc.rn = 1
    GROUP BY pc.ACCOUNT, pc.categoria_entrada
)
-- Análisis de conversión de cuentas monocategoría a multicategoría según la categoría de entrada
SELECT 
    categoria_entrada,
    COUNT(ACCOUNT) as cuentas_captadas,
    SUM(CASE WHEN total_categorias = 1 THEN 1 ELSE 0 END) as cuentas_monocategoria,
    SUM(CASE WHEN total_categorias > 1 THEN 1 ELSE 0 END) as cuentas_multicategoria,
    ROUND(SUM(CASE WHEN total_categorias > 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(ACCOUNT), 2) as porcentaje_tasa_expansion
FROM evolucion_cuenta
GROUP BY categoria_entrada
ORDER BY cuentas_captadas DESC;



-- =======================================================================================


-- Frecuencia de recompra

-- CTE 1: Cronología de compras
WITH compras_en_orden as (
    SELECT 
        ACCOUNT,
        DATE,
        CATEGORY,
        TOTAL,
        PROFIT,
        COUNT(DISTINCT CATEGORY) OVER (
            PARTITION BY ACCOUNT 
            ORDER BY DATE ASC 
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ) as cuentas_categorias_cumulativa,
        LEAD(DATE) OVER (PARTITION BY ACCOUNT ORDER BY DATE ASC) as dia_siguiente
    FROM SALES
),
-- CTE: Frecuencia de compras y segmentación según el tipo de cuenta (multi/mono) en ese momento
frecuencia_recompra as (
    SELECT 
        ACCOUNT,
        DATE,
        CATEGORY,
        TOTAL,
        PROFIT,
        cuentas_categorias_cumulativa,
        DATEDIFF('day', DATE, dia_siguiente) as dias_hasta_siguiente_compra,
        CASE 
            WHEN cuentas_categorias_cumulativa = 1 THEN 'Monocategoria'
            ELSE 'Multicategoria'
        END as perfil_compra
    FROM compras_en_orden
    WHERE dia_siguiente IS NOT NULL
)
-- Comparativa de frecuencia de compra, beneficios y márgenes en función del tipo de cuenta (multi/mono)
SELECT 
    perfil_compra,
    COUNT(*) as total_recompras,
    ROUND(AVG(dias_hasta_siguiente_compra), 2) as media_dias_entre_compras,
    ROUND(AVG(TOTAL), 2) as media_ingresos,
    ROUND(AVG(PROFIT), 2) as media_beneficios,
    ROUND(AVG(TOTAL)/AVG(dias_hasta_siguiente_compra), 2) as media_ingresos_dia,
    ROUND(AVG(PROFIT)/AVG(dias_hasta_siguiente_compra), 2) as media_beneficios_dia,
    ROUND(SUM(PROFIT) / NULLIF(SUM(TOTAL), 0) * 100, 2) as porcentaje_margen_beneficios
FROM frecuencia_recompra
GROUP BY perfil_compra;



-- CTE 1 y 2: Primera transacción histórica y su categoría
WITH primera_categoria_por_cuenta as (
    SELECT 
        ACCOUNT,
        CATEGORY as categoria_principal,
        DATE as fecha_primera_categoria,
        ROW_NUMBER() OVER (PARTITION BY ACCOUNT ORDER BY DATE ASC) as rn
    FROM SALES
),
primera_entrada as (
    SELECT ACCOUNT, categoria_principal, fecha_primera_categoria
    FROM primera_categoria_por_cuenta
    WHERE rn = 1
),
-- CTE 3 y 4: Identifico la segunda categoría a la que se expande con sus fechas
adopcion_segunda_categoria as (
    SELECT 
        s.ACCOUNT,
        s.CATEGORY as categoria_secundaria,
        MIN(s.DATE) as fecha_adopcion
    FROM SALES s
    INNER JOIN primera_entrada as pe ON s.ACCOUNT = pe.ACCOUNT
    WHERE s.CATEGORY != pe.categoria_principal 
      AND s.DATE > pe.fecha_primera_categoria
    GROUP BY s.ACCOUNT, s.CATEGORY
),
primera_expansion as (
    SELECT 
        ACCOUNT,
        categoria_secundaria,
        fecha_adopcion,
        ROW_NUMBER() OVER (PARTITION BY ACCOUNT ORDER BY fecha_adopcion ASC) as rn
    FROM adopcion_segunda_categoria
),
-- CTE 5: Unión con la cronología de la primera entrada
cronologia_expansion as (
    SELECT 
        pe.ACCOUNT,
        pe.categoria_principal,
        pex.categoria_secundaria,
        pex.fecha_adopcion
    FROM primera_entrada as pe
    INNER JOIN primera_expansion as pex ON pe.ACCOUNT = pex.ACCOUNT
    WHERE pex.rn = 1
),
-- Métricas en ventas móviles de 90 días
metricas_ventana as (
    SELECT 
        ce.ACCOUNT,
        ce.categoria_principal,
        ce.categoria_secundaria,
        SUM(CASE 
            WHEN s.CATEGORY = ce.categoria_principal 
             AND s.DATE >= DATEADD('day', -90, ce.fecha_adopcion) 
             AND s.DATE < ce.fecha_adopcion 
            THEN s.TOTAL ELSE 0 
        END) as gasto_principal_antes_90,
        SUM(CASE 
            WHEN s.CATEGORY = ce.categoria_principal 
             AND s.DATE > ce.fecha_adopcion 
             AND s.DATE <= DATEADD('day', 90, ce.fecha_adopcion) 
            THEN s.TOTAL ELSE 0 
        END) as gasto_principal_despues_90,
        SUM(CASE 
            WHEN s.CATEGORY = ce.categoria_secundaria 
             AND s.DATE >= ce.fecha_adopcion 
             AND s.DATE <= DATEADD('day', 90, ce.fecha_adopcion) 
            THEN s.TOTAL ELSE 0 
        END) as gasto_secundario_primeros_90
    FROM cronologia_expansion as ce
    INNER JOIN SALES s ON ce.ACCOUNT = s.ACCOUNT
    GROUP BY ce.ACCOUNT, ce.categoria_principal, ce.categoria_secundaria, ce.fecha_adopcion
)
-- Evaluación de la canibalización
SELECT 
    categoria_principal,
    categoria_secundaria,
    COUNT(ACCOUNT) as cuentas_en_expansion,
    ROUND(AVG(gasto_principal_antes_90), 2) as media_gasto_principal_antes_90,
    ROUND(AVG(gasto_principal_despues_90), 2) as media_gasto_principal_despues_90,
    ROUND(AVG(gasto_principal_despues_90 - gasto_principal_antes_90), 2) as variacion_neta_categoria_principal,
    ROUND(AVG(gasto_secundario_primeros_90), 2) as media_ingresos_categoria_secundaria,
    ROUND(AVG((gasto_principal_despues_90 + gasto_secundario_primeros_90) - gasto_principal_antes_90), 2) as expansion_neta_total_cuenta
FROM metricas_ventana
GROUP BY categoria_principal, categoria_secundaria
HAVING COUNT(ACCOUNT) >= 2
ORDER BY expansion_neta_total_cuenta DESC;



-- Efecto de la adopción multicategoría temprana

-- CTE 1 y 2: Primera transacción histórica y hábitos en primeros 90 días
WITH primera_compra_cuenta as (
    SELECT 
        ACCOUNT,
        MIN(DATE) as fecha_adquisicion
    FROM SALES
    GROUP BY ACCOUNT
),
comportamiento_inicial_cuenta as (
    SELECT 
        pcc.ACCOUNT,
        pcc.fecha_adquisicion,
        COUNT(DISTINCT s.CATEGORY) as numero_categorias_iniciales
    FROM primera_compra_cuenta as pcc
    INNER JOIN SALES s ON pcc.ACCOUNT = s.ACCOUNT
    WHERE s.DATE <= DATEADD('day', 90, pcc.fecha_adquisicion)
    GROUP BY pcc.ACCOUNT, pcc.fecha_adquisicion
),
-- Evalúo la retención en los primeros 180 y 360 días tras la captación
analisis_retencion_cuenta as (
    SELECT 
        cic.ACCOUNT,
        CASE 
            WHEN cic.numero_categorias_iniciales > 1 THEN 'Multicategoria Temprana'
            ELSE 'Monocategoria Temprana'
        END as perfil_incorporacion,
        MAX(CASE 
            WHEN s.DATE > DATEADD('day', 90, cic.fecha_adquisicion) 
             AND s.DATE <= DATEADD('day', 180, cic.fecha_adquisicion) 
            THEN 1 ELSE 0 
        END) as activo_dias_91_a_180,
        MAX(CASE 
            WHEN s.DATE > DATEADD('day', 180, cic.fecha_adquisicion) 
             AND s.DATE <= DATEADD('day', 360, cic.fecha_adquisicion) 
            THEN 1 ELSE 0 
        END) as activo_dias_181_a_360,
        SUM(s.TOTAL) as ingresos_acumulados,
        SUM(s.PROFIT) as beneficio_acumulado
    FROM comportamiento_inicial_cuenta as cic
    INNER JOIN SALES s ON cic.ACCOUNT = s.ACCOUNT
    WHERE cic.fecha_adquisicion <= DATEADD('day', -360, '2021-12-31')
    GROUP BY cic.ACCOUNT, perfil_incorporacion
)
-- Comparativa agregada de retención a medio y largo plazo.
SELECT 
    perfil_incorporacion,
    COUNT(ACCOUNT) as total_cuentas_cohorte,
    ROUND(AVG(activo_dias_91_a_180) * 100, 2) as porcentaje_tasa_rentencion_180_dias,
    ROUND(AVG(activo_dias_181_a_360) * 100, 2) as porcentaje_tasa_rentencion_360_dias,
    ROUND(AVG(ingresos_acumulados), 2) as media_ingresos_acumulados,
    ROUND(AVG(beneficio_acumulado), 2) as media_beneficios_acumulados,
    ROUND(SUM(beneficio_acumulado) / NULLIF(SUM(ingresos_acumulados), 0) * 100, 2) as porcentaje_margen_beneficio_global
FROM analisis_retencion_cuenta
GROUP BY perfil_incorporacion;



