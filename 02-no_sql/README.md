# 02 - NoSQL (MongoDB)

Módulo de bases de datos orientadas a documentos trabajado con MongoDB (`mongosh` y MongoDB Compass). Incluye scripts de práctica CRUD, consultas avanzadas y el proyecto de análisis sobre películas.

## Estructura del módulo

```text
02-no_sql/
├── README.md
├── data/                      # Excluida de Git (.gitignore: **/data/)
│   ├── movies.json
│   └── puntuaciones.json
└── src/
    ├── learning/
    │   ├── CR_query_inventory.js
    │   ├── UD_query_inventory.js
    │   └── exercises.js
    └── project/
        └── movies_jorge.js
```

## Contenido

### Prácticas (`src/learning/`)

| Archivo | Contenido |
| --- | --- |
| `CR_query_inventory.js` | Creación e inserción de documentos (`insertOne`, `insertMany`) y consultas básicas sobre `inventory`. |
| `UD_query_inventory.js` | Actualización (`$set`, `$unset`, `$rename`), borrado (`deleteMany`) y filtros (`$gt`, `$in`) sobre `inventory`. |
| `exercises.js` | Práctica guiada completa en la base de datos `practica_nosql` (desde CRUD hasta agregaciones, arrays, fechas y cadenas). |

### Proyecto (`src/project/`)

- `movies_jorge.js`: resolución de ejercicios sobre la base de datos `master` y las colecciones `movies`, `actors` y `genres` (limpieza de datos con `$pull`/`$push`, consultas y pipelines de agregación).

## Estructura de `data/` (local, no versionada)

Los datasets no se suben al repositorio. En local se encuentran en `02-no_sql/data/` en formato NDJSON (JSON Lines: un documento JSON por línea, apto para importación directa con `mongoimport` o MongoDB Compass).

### `movies.json`

- Documentos: 28795
- Esquema por documento:
  - `title` (string): título de la película.
  - `year` (number): año de estreno.
  - `cast` (array de strings): reparto (puede estar vacío `[]`).
  - `genres` (array de strings): géneros asociados (puede estar vacío `[]`).

Ejemplo de documento:

```json
{ "title": "Capture of Boer Battery by British", "year": 1900, "cast": [], "genres": ["Short", "Documentary"] }
```

### `puntuaciones.json`

- Documentos: 1615
- Esquema por documento:
  - `borough` (string): distrito.
  - `cuisine` (string): tipo de cocina.
  - `name` (string): nombre del establecimiento.
  - `restaurant_id` (string): identificador del restaurante.
  - `building` (string): número de edificio.
  - `street` (string): calle.
  - `zipcode` (string): código postal.
  - `date` (object, Extended JSON `{"$date": "<ISO-8601>"}`): fecha de inspección.
  - `grade` (string): calificación obtenida (por ejemplo `A`, `B`, `Z`).
  - `score` (number): puntuación numérica de la inspección.

Ejemplo de documento:

```json
{"borough":"Brooklyn","cuisine":"Hamburgers","name":"Wendy'S","restaurant_id":"30112340","building":"469","street":"Flatbush Avenue","zipcode":"11225","date":{"$date":"2014-12-30T00:00:00.000Z"},"grade":"A","score":8}
```
