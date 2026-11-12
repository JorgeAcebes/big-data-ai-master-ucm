# 01 - SQL (Snowflake)

Módulo de bases de datos relacionales trabajado sobre Snowflake (`DATABASE MASTER`), dividido en prácticas guiadas con el esquema `ONU` y el proyecto final con el esquema `SMART_DESK`.

## Estructura del módulo

```text
01-sql/
├── README.md
├── docs/
│   └── SQL_Smart_Desk.pdf
├── data/                              # Excluida de Git (.gitignore: **/data/)
│   └── Datasets_/
│       ├── Accounts.csv
│       ├── Forecasts.csv
│       ├── Sales.csv
│       └── Targets.csv
└── src/
    ├── learning/
    │   ├── 1. DDL Creación objetos ONU.sql
    │   ├── 2. DQL and UPDATE.sql
    │   ├── 3. DML Ejemplos.sql
    │   ├── 4. JOINs.sql
    │   ├── 5. Advanced Queries.sql
    │   └── Exercises ONU.sql
    └── project/
        └── smart_desk.sql
```

## Contenido

### Documentación (`docs/`)

- `SQL_Smart_Desk.pdf`: enunciado y contexto del caso práctico final Smart Desk.

### Prácticas (`src/learning/`)

| Archivo | Contenido |
| --- | --- |
| `1. DDL Creación objetos ONU.sql` | Creación de base de datos `MASTER`, esquema `ONU` y tabla `HUMAN_DEVELOPMENTS`. |
| `2. DQL and UPDATE.sql` | Limpieza de nulos con `DELETE` y actualización condicional con `UPDATE` y `CASE`. |
| `3. DML Ejemplos.sql` | Consultas `SELECT`, alias y filtrado básico sobre `HUMAN_DEVELOPMENTS`. |
| `4. JOINs.sql` | Cruces entre `HUMAN_DEVELOPMENTS`, `COUNTRIES` y `COUNTRY_POPULATIONS`. |
| `5. Advanced Queries.sql` | Uso de `TOP`, clasificación con `CASE` y creación de vistas (`vista_resumen`). |
| `Exercises ONU.sql` | Batería de ejercicios resueltos sobre el esquema `ONU`. |

### Proyecto (`src/project/`)

- `smart_desk.sql`: resolución completa de la tarea final sobre el esquema `SMART_DESK` usando las tablas `ACCOUNTS`, `SALES`, `FORECASTS` y `TARGETS` (CTEs, agregaciones, joins y análisis comercial).

## Estructura de `data/` (local, no versionada)

Los datos fuente no se suben al repositorio. En local se ubican en `01-sql/data/Datasets_/` en formato CSV delimitado por comas (`,`), con codificación UTF-8 (`Forecasts.csv` incluye BOM UTF-8).

| Archivo | Registros | Columnas | Descripción breve |
| --- | --- | --- | --- |
| `Accounts.csv` | 188 | `ACCOUNT`, `ACCOUNT_EXECUTIVE`, `ACCOUNT_LEVEL`, `CONTACT_EMAIL`, `COUNTRY`, `INDUSTRY`, `REGION` | Maestro de cuentas (clientes y prospectos), ejecutivo asignado, sector y geografía (`EMEA`, `NAM`, `APAC`). |
| `Forecasts.csv` | 135 | `ACCOUNT`, `CATEGORY`, `PREDICTION_CATEGORY`, `FORECAST`, `OPPORTUNITY_AGE`, `YEAR` | Previsiones de oportunidad por cuenta y categoría (`Pipeline`, `Upside`, `Commit`), importe previsto y antigüedad. |
| `Sales.csv` | 14521 | `ACCOUNT`, `CATEGORY`, `DATE`, `DAY_NAME`, `MAINTENANCE`, `PARTS`, `PRODUCT`, `PROFIT`, `SUPPORT`, `TOTAL`, `UNITS_SOLD`, `YEAR`, `QUARTER` | Histórico diario de ventas por cuenta y categoría de producto, con desglose de ingresos, unidades vendidas y beneficio. |
| `Targets.csv` | 12 | `YEAR`, `QUARTER`, `QUARTER_OF_YEAR`, `TARGET_TOTAL`, `TARGET_PROFIT` | Objetivos trimestrales globales de facturación (`TARGET_TOTAL`) y beneficio (`TARGET_PROFIT`) entre 2019 y 2021. |
