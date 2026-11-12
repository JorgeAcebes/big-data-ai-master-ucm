# Big Data & AI Master - UCM

Repositorio de prácticas, apuntes ejecutables y proyectos del Máster en Big Data e Inteligencia Artificial (UCM).

## Estructura del repositorio

```text
big-data-ai-master-ucm/
├── .gitignore
├── README.md
├── 01-sql/       # Bases de datos relacionales (SQL / Snowflake)
└── 02-no_sql/    # Bases de datos documentales (NoSQL / MongoDB)
```

## Convención por módulo

Cada carpeta de módulo sigue una organización común:

- `src/learning/`: scripts de clase y ejercicios prácticos.
- `src/project/`: proyecto o tarea final del módulo.
- `docs/`: enunciados o documentación de apoyo (cuando aplica).
- `data/`: conjuntos de datos locales. No se suben a GitHub (excluidos mediante `.gitignore` con la regla `**/data/`), por lo que su estructura y esquema se documentan en el `README.md` de cada módulo.

## Módulos

| Módulo | Tecnología principal | Descripción | Detalle |
| --- | --- | --- | --- |
| `01-sql` | SQL (Snowflake) | DDL, DML, DQL, joins, vistas y proyecto Smart Desk | [01-sql/README.md](01-sql/README.md) |
| `02-no_sql` | MongoDB (`mongosh`) | Operaciones CRUD, filtros y agregaciones | [02-no_sql/README.md](02-no_sql/README.md) |
