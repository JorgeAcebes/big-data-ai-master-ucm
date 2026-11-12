// ============================================================================
// PRÁCTICA COMPLETA DE MONGODB
// Nivel: desde cero hasta agregaciones, arrays, fechas y cadenas
// Entorno: MongoDB Compass / Mongosh
//
// INSTRUCCIONES
// 1. Ejecuta la sección 0 para cargar todos los datos.
// 2. Lee la explicación de cada sección.
// 3. Resuelve el enunciado en el espacio reservado.
// 4. Descomenta la solución para comprobar tu respuesta.
// 5. Ejecuta cada consulta por separado cuando estés practicando.
//
// IMPORTANTE: la sección 0 BORRA las colecciones de esta práctica
// si ya existen. No la vuelvas a ejecutar si quieres conservar tus cambios.
// ============================================================================


// ############################################################################
// 0. PREPARACIÓN Y CARGA DE DATOS
// ############################################################################

// Seleccionamos una base de datos.
// Si no existe, MongoDB la creará al insertar el primer documento.

use practica_nosql

// Reiniciamos exclusivamente las colecciones de esta práctica.

db.inventory.drop()
db.inventoryE.drop()
db.inventoryA.drop()
db.inventoryAE.drop()
db.restaurantes.drop()
db.arts.drop()
db.ventas.drop()
db.fechas.drop()
db.precios.drop()


// ----------------------------------------------------------------------------
// 0.1. INVENTARIO: documentos planos
// ----------------------------------------------------------------------------

// Cada documento representa un producto.
// Algunos productos tienen el mismo nombre, pero distintos precios y tamaños.

db.inventory.insertMany([
    {
        item: "camiseta",
        qty: 100,
        price: 19.5,
        tag: "algodon",
        size_h: 28,
        size_w: 35.5,
        size_uom: "cm"
    },
    {
        item: "camiseta",
        qty: 100,
        price: 22.5,
        tag: "algodon",
        size_h: 56,
        size_w: 47,
        size_uom: "pu"
    },
    {
        item: "medias",
        qty: 10,
        price: 1.5,
        tag: "licra",
        size_h: 2,
        size_w: 3,
        size_uom: "cm"
    },
    {
        item: "corbata",
        qty: 6,
        price: 5.5,
        tag: "algodon",
        size_h: 5,
        size_w: 4,
        size_uom: "cm"
    },
    {
        item: "camiseta",
        qty: 78,
        price: 10.5,
        tag: "carton",
        size_h: 4,
        size_w: 1,
        size_uom: "cm"
    },
    {
        item: "pantalon",
        qty: 35,
        price: 29.9,
        tag: "algodon",
        size_h: 105,
        size_w: 40,
        size_uom: "cm"
    },
    {
        item: "chaqueta",
        qty: 12,
        price: 59.9,
        tag: "poliester",
        size_h: 75,
        size_w: 55,
        size_uom: "cm"
    },
    {
        item: "gorra",
        qty: 0,
        price: 12,
        tag: "algodon",
        size_h: 15,
        size_w: 20,
        size_uom: "cm"
    },
    {
        item: "calcetines",
        qty: 50,
        price: 3.25,
        tag: "licra",
        size_h: 25,
        size_w: 8,
        size_uom: "cm"
    },
    {
        item: "bufanda",
        qty: 20,
        price: 14.5,
        tag: "lana",
        size_h: 180,
        size_w: 30,
        size_uom: "cm"
    }
])

db.inventory.find()


// ----------------------------------------------------------------------------
// 0.2. INVENTARIO CON DOCUMENTOS EMBEBIDOS
// ----------------------------------------------------------------------------

// En vez de guardar size_h, size_w y size_uom por separado,
// guardamos un documento dentro del documento principal: size.

db.inventoryE.insertMany([
    {
        item: "camiseta",
        qty: 100,
        price: 19.5,
        tag: "algodon",
        size: { h: 28, w: 35.5, uom: "cm" }
    },
    {
        item: "camiseta",
        qty: 100,
        price: 22.5,
        tag: "algodon",
        size: { h: 56, w: 47, uom: "pu" }
    },
    {
        item: "medias",
        qty: 10,
        price: 1.5,
        tag: "licra",
        size: { h: 2, w: 3, uom: "cm" }
    },
    {
        item: "corbata",
        qty: 6,
        price: 5.5,
        tag: "algodon",
        size: { h: 5, w: 4, uom: "cm" }
    },
    {
        item: "camiseta",
        qty: 78,
        price: 10.5,
        tag: "carton",
        size: { h: 4, w: 1, uom: "cm" }
    },
    {
        item: "pantalon",
        qty: 35,
        price: 29.9,
        tag: "algodon",
        size: { h: 105, w: 40, uom: "cm" }
    },
    {
        item: "chaqueta",
        qty: 12,
        price: 59.9,
        tag: "poliester",
        size: { h: 75, w: 55, uom: "cm" }
    }
])


// ----------------------------------------------------------------------------
// 0.3. INVENTARIO CON ARRAYS
// ----------------------------------------------------------------------------

// tag ahora puede contener varios valores.
// Un producto puede tener etiquetas como "algodon" y "fino".

db.inventoryA.insertMany([
    {
        item: "camiseta",
        qty: 100,
        price: 19.5,
        tag: ["algodon", "fino"],
        size: { h: 28, w: 35.5, uom: "cm" }
    },
    {
        item: "camiseta",
        qty: 100,
        price: 22.5,
        tag: ["algodon", "fino"],
        size: { h: 56, w: 47, uom: "pu" }
    },
    {
        item: "medias",
        qty: 10,
        price: 1.5,
        tag: ["licra"],
        size: { h: 2, w: 3, uom: "cm" }
    },
    {
        item: "corbata",
        qty: 6,
        price: 5.5,
        tag: ["algodon", "seda"],
        size: { h: 5, w: 4, uom: "cm" }
    },
    {
        item: "camiseta",
        qty: 78,
        price: 10.5,
        tag: ["carton", "piedra"],
        size: { h: 4, w: 1, uom: "cm" }
    },
    {
        item: "pantalon",
        qty: 35,
        price: 29.9,
        tag: ["algodon", "resistente"],
        size: { h: 105, w: 40, uom: "cm" }
    },
    {
        item: "chaqueta",
        qty: 12,
        price: 59.9,
        tag: ["poliester", "impermeable"],
        size: { h: 75, w: 55, uom: "cm" }
    }
])


// ----------------------------------------------------------------------------
// 0.4. INVENTARIO CON ARRAYS DE DOCUMENTOS
// ----------------------------------------------------------------------------

// Aquí size es un ARRAY de documentos, no un único documento.

db.inventoryAE.insertMany([
    {
        item: "camiseta",
        qty: 100,
        price: 19.5,
        tag: ["algodon", "fino"],
        size: [
            { h: 28, w: 35.5, uom: "cm" },
            { h: 56, w: 47, uom: "pu" }
        ]
    },
    {
        item: "medias",
        qty: 10,
        price: 1.5,
        tag: ["licra"],
        size: [
            { h: 2, w: 3, uom: "cm" }
        ]
    },
    {
        item: "corbata",
        qty: 6,
        price: 5.5,
        tag: ["algodon", "seda"],
        size: [
            { h: 5, w: 4, uom: "cm" }
        ]
    },
    {
        item: "camiseta",
        qty: 78,
        price: 10.5,
        tag: ["carton", "piedra"],
        size: [
            { h: 4, w: 1, uom: "cm" }
        ]
    },
    {
        item: "pantalon",
        qty: 35,
        price: 29.9,
        tag: ["algodon", "resistente"],
        size: [
            { h: 105, w: 40, uom: "cm" },
            { h: 110, w: 42, uom: "cm" }
        ]
    }
])


// ----------------------------------------------------------------------------
// 0.5. RESTAURANTES: datos ficticios para practicar
// ----------------------------------------------------------------------------

// Cada documento representa una valoración.
// Un restaurante puede aparecer varias veces, una por valoración.

db.restaurantes.insertMany([
    { name: "Sol", borough: "Manhattan", cuisine: "American", grade: "A", score: 10, street: "Broadway", zipcode: "10001", date: "2024-01-15" },
    { name: "Luna", borough: "Brooklyn", cuisine: "Italian", grade: "A", score: 18, street: "Atlantic Ave", zipcode: "11201", date: "2024-02-10" },
    { name: "Roma", borough: "Manhattan", cuisine: "Italian", grade: "B", score: 14, street: "Lexington Ave", zipcode: "10016", date: "2024-03-05" },
    { name: "Central", borough: "Queens", cuisine: "American", grade: "A", score: 9, street: "Main Street", zipcode: "11354", date: "2024-04-12" },
    { name: "Verde", borough: "Brooklyn", cuisine: "Mexican", grade: "B", score: 22, street: "Fulton Street", zipcode: "11217", date: "2024-05-20" },
    { name: "Pasta", borough: "Manhattan", cuisine: "Italian", grade: "A", score: 11, street: "5th Avenue", zipcode: "10010", date: "2024-06-11" },
    { name: "Green", borough: "Queens", cuisine: "American", grade: "B", score: 15, street: "Queens Blvd", zipcode: "11373", date: "2024-07-09" },
    { name: "Taco", borough: "Bronx", cuisine: "Mexican", grade: "A", score: 7, street: "Grand Concourse", zipcode: "10451", date: "2024-08-17" },
    { name: "Nápoles", borough: "Brooklyn", cuisine: "Italian", grade: "A", score: 25, street: "Court Street", zipcode: "11231", date: "2024-09-21" },
    { name: "Deli", borough: "Manhattan", cuisine: "American", grade: "A", score: 12, street: "Wall Street", zipcode: "10005", date: "2024-10-01" },
    { name: "Oriente", borough: "Queens", cuisine: "Chinese", grade: "A", score: 6, street: "Roosevelt Ave", zipcode: "11372", date: "2024-11-03" },
    { name: "Bambú", borough: "Bronx", cuisine: "Chinese", grade: "B", score: 19, street: "Fordham Road", zipcode: "10458", date: "2024-12-14" },
    { name: "Bistro", borough: "Manhattan", cuisine: "French", grade: "A", score: 8, street: "Madison Ave", zipcode: "10021", date: "2025-01-08" },
    { name: "Mar", borough: "Brooklyn", cuisine: "American", grade: "C", score: 30, street: "Ocean Ave", zipcode: "11226", date: "2025-02-19" },
    { name: "Sakura", borough: "Queens", cuisine: "Japanese", grade: "A", score: 13, street: "Northern Blvd", zipcode: "11358", date: "2025-03-22" },
    { name: "Pizzería", borough: "Bronx", cuisine: "Italian", grade: "B", score: 16, street: "Arthur Ave", zipcode: "10458", date: "2025-04-04" },
    { name: "Brasa", borough: "Brooklyn", cuisine: "American", grade: "A", score: 5, street: "Smith Street", zipcode: "11201", date: "2025-05-13" },
    { name: "Wok", borough: "Manhattan", cuisine: "Chinese", grade: "B", score: 21, street: "Canal Street", zipcode: "10013", date: "2025-06-07" },
    { name: "La Huerta", borough: "Queens", cuisine: "Mexican", grade: "A", score: 10, street: "Junction Blvd", zipcode: "11368", date: "2025-07-16" },
    { name: "Osteria", borough: "Manhattan", cuisine: "Italian", grade: "A", score: 20, street: "Park Avenue", zipcode: "10022", date: "2025-08-25" }
])


// ----------------------------------------------------------------------------
// 0.6. CUADROS
// ----------------------------------------------------------------------------

db.arts.insertMany([
    { title: "The Pillars of Society", artist: "Grosz", year: 1926, price: NumberDecimal("199.99") },
    { title: "Melancholy III", artist: "Munch", year: 1902, price: NumberDecimal("280.00") },
    { title: "Dancer", artist: "Miro", year: 1925, price: NumberDecimal("76.04") },
    { title: "The Great Wave off Kanagawa", artist: "Hokusai", price: NumberDecimal("167.30") },
    { title: "The Persistence of Memory", artist: "Dali", year: 1931, price: NumberDecimal("483.00") },
    { title: "Composition VII", artist: "Kandinsky", year: 1913, price: NumberDecimal("385.00") },
    { title: "The Scream", artist: "Munch", year: 1893 },
    { title: "Blue Flower", artist: "O'Keefe", year: 1918, price: NumberDecimal("118.42") },
    { title: "New Horizon", artist: "Grosz", year: 1940, price: NumberDecimal("250.00") },
    { title: "Untitled", artist: "Anonimo", year: 2020, price: NumberDecimal("99.00") }
])


// ----------------------------------------------------------------------------
// 0.7. VENTAS POR TRIMESTRE Y REGIÓN
// ----------------------------------------------------------------------------

db.ventas.insertMany([
    { quarter: "2024Q1", region: "A", qty: 400 },
    { quarter: "2024Q1", region: "B", qty: 550 },
    { quarter: "2024Q1", region: "C", qty: 1000 },
    { quarter: "2024Q2", region: "A", qty: 660 },
    { quarter: "2024Q2", region: "B", qty: 500 },
    { quarter: "2024Q2", region: "C", qty: 1200 },
    { quarter: "2024Q3", region: "A", qty: 700 },
    { quarter: "2024Q3", region: "B", qty: 850 },
    { quarter: "2024Q3", region: "C", qty: 950 }
])


// ----------------------------------------------------------------------------
// 0.8. FECHAS
// ----------------------------------------------------------------------------

db.fechas.insertMany([
    { qty: 1, fecha: "2024-01-01T10:30:02Z" },
    { qty: 3, fecha: "2024-02-05T10:30:02Z" },
    { qty: 3, fecha: "2024-01-05T10:30:02Z" },
    { qty: 2, fecha: "2023-01-01T10:30:02Z" },
    { qty: 5, fecha: "2025-03-15T12:00:00Z" },
    { qty: 4, fecha: "2025-03-22T09:00:00Z" },
    { qty: 7, fecha: "2024-12-31T23:59:00Z" }
])


// ----------------------------------------------------------------------------
// 0.9. PRECIOS COMO CADENAS DE TEXTO
// ----------------------------------------------------------------------------

// Los precios están guardados como texto, no como números.
// Más adelante los separaremos, limpiaremos y convertiremos.

db.precios.insertMany([
    { producto: "A", precio: "-$100,56~$1000,23" },
    { producto: "B", precio: "$25,50~$40,75" },
    { producto: "C", precio: "$8,99~$12,00" }
])


// Comprueba las colecciones cargadas.

show collections

// Puedes consultar los datos con:
// db.inventory.find()
// db.inventoryE.find()
// db.inventoryA.find()
// db.inventoryAE.find()
// db.restaurantes.find()
// db.arts.find()
// db.ventas.find()
// db.fechas.find()
// db.precios.find()


// ############################################################################
// 1. INSERTAR, CONSULTAR Y COMPRENDER LOS DOCUMENTOS
// ############################################################################

// EXPLICACIÓN PRÁCTICA
//
// Un documento de MongoDB es parecido a una fila de SQL, pero puede contener
// documentos internos y arrays.
//
// find() muestra documentos.
// find({}) significa: no impongas ningún filtro; devuelve todos los documentos.
//
// insertOne() inserta un documento.
// insertMany() inserta varios.
//
// En un filtro, los campos que escribes juntos normalmente funcionan como AND.
// Es decir, deben cumplirse todos.
//
// EJERCICIO 1.1
// Muestra todos los productos del inventario.
//
// TU SOLUCIÓN:

db.inventory.find()
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find({})
// Explicación: {} es un filtro vacío, por lo que no excluye ningún documento.


// EJERCICIO 1.2
// Busca los productos cuyo item sea "camiseta".

db.inventory.find({item: "camiseta"})
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find({ item: "camiseta" })
// Explicación: solo se devuelven los documentos que tienen ese valor en item.


// EJERCICIO 1.3
// Busca los productos que sean camisetas y tengan exactamente 78 unidades.

db.inventory.find({item: "camiseta", qty: 78})
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find({ item: "camiseta", qty: 78 })
// Explicación: ambos criterios deben cumplirse simultáneamente.


// EJERCICIO 1.4
// Busca los productos que sean camisetas y tengan 78 unidades y precio 10.5.


var query = {item: "camiseta", qty: 78, price: 10.5}
db.inventory.find(query)
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find({ item: "camiseta", qty: 78, price: 10.5 })
// Explicación: tres condiciones en un mismo documento de consulta equivalen a AND.


// EJERCICIO 1.5
// Inserta un producto nuevo: una libreta, con 25 unidades, precio 4.5 y etiqueta
// "papel". Después, búscala


var product = {
    item: "libreta",
    qty: 25, 
    price: 4.5,
    tag: "paper"
}
db.inventory.insertOne(product)



var product = {
    item: "libreta",
    qty: 25, 
    price: 4.5,
    tag: "paper"
}
db.inventory.find(product)
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.insertOne({
//     item: "libreta",
//     qty: 25,
//     price: 4.5,
//     tag: "papel"
// })
// db.inventory.find({ item: "libreta" })
// Explicación: insertOne recibe un único documento BSON/JavaScript.


// ############################################################################
// 2. PROYECCIONES: ELEGIR QUÉ CAMPOS SE MUESTRAN
// ############################################################################

// EXPLICACIÓN PRÁCTICA
//
// find(FILTRO, PROYECCIÓN)
//
// La proyección controla qué campos aparecen en el resultado.
//
// { qty: 1 } significa incluir qty.
// { qty: 0 } significa excluir qty.
//
// Regla importante: normalmente no puedes mezclar inclusiones y exclusiones
// en la misma proyección, salvo la exclusión de _id.
//
// MongoDB incluye _id por defecto. Para ocultarlo, escribe _id: 0.
//
// EJERCICIO 2.1
// Busca las camisetas y muestra únicamente qty.

var query = {item: "camiseta"}
var proy = {qty: 1, _id: 0}
db.inventory.find(query, proy)
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find({ item: "camiseta" }, { qty: 1 })
// Explicación: se incluye qty y MongoDB conserva _id por defecto.


// EJERCICIO 2.2
// Muestra item, qty y price de todos los productos, sin mostrar _id.

proy = {item: 1, qty: 1, _id: 0}

db.inventory.find({}, proy)

//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find({}, { _id: 0, item: 1, qty: 1, price: 1 })
// Explicación: se incluyen los tres campos solicitados y se excluye _id.


// EJERCICIO 2.3
// Muestra todos los campos excepto size_w y size_h.

//
// TU SOLUCIÓN:

db.inventory.find({}, {size_h: 0, size_w: 0})

// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find({}, { size_w: 0, size_h: 0 })
// Explicación: al utilizar exclusiones se mantienen los demás campos.


// EJERCICIO 2.4
// Busca productos de etiqueta "algodon" y muestra item y price, sin _id.
//
// TU SOLUCIÓN:

var query = {tag: "algodon"}
var proy = {item: 1, price: 1, _id: 0}
db.inventory.find( query, proy)

// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find(
//     { tag: "algodon" },
//     { _id: 0, item: 1, price: 1 }
// )
// Explicación: el filtro decide qué documentos aparecen; la proyección,
// qué campos aparecen dentro de cada documento.


// ############################################################################
// 3. OPERADORES DE COMPARACIÓN
// ############################################################################

// EXPLICACIÓN PRÁCTICA
//
// $gt: mayor que.
// $gte: mayor o igual que.
// $lt: menor que.
// $lte: menor o igual que.
// $eq: igual que.
// $ne: distinto de.
// $in: pertenece a una lista de valores.
// $nin: no pertenece a una lista de valores.
//
// Piensa que el operador va dentro del campo al que afecta.
//
// EJERCICIO 3.1
// Busca productos con más de 50 unidades.

var query = {qty: {$gt: 50}}
db.inventory.find(query)
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find({ qty: { $gt: 50 } })


// EJERCICIO 3.2
// Busca productos con 35 unidades o menos.
//
// TU SOLUCIÓN:

var query = {qty: {$lte: 35}}
db.inventory.find(query)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find({ qty: { $lte: 35 } })


// EJERCICIO 3.3
// Busca productos cuyo precio sea mayor o igual que 20.
//
// TU SOLUCIÓN:

var query = {price: {$gte: 20}}
db.inventory.find(query)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find({ price: { $gte: 20 } })


// EJERCICIO 3.4
// Busca productos cuya cantidad sea distinta de 100.
//
// TU SOLUCIÓN:

var query = {qty : {$ne: 100}}
db.inventory.find(query)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find({ qty: { $ne: 100 } })
// Nota: $ne también puede incluir documentos en los que el campo no existe.


// EJERCICIO 3.5
// Busca productos cuyo tag sea "algodon" o "licra".
//
// TU SOLUCIÓN:
var query = {tag: {$in: ["algodon", "licra"]}}
db.inventory.find(query)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find({ tag: { $in: ["algodon", "licra"] } })
// Explicación: $in acepta cualquiera de los valores de la lista.


// EJERCICIO 3.6
// Busca productos con precio entre 10 y 30, incluyendo ambos límites.
//
// TU SOLUCIÓN:
var query = {price: {$gte: 10, $lte: 30}}
db.inventory.find(query)

// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find({ price: { $gte: 10, $lte: 30 } })
// Explicación: los dos operadores deben cumplirse para el mismo campo.


// ############################################################################
// 4. OPERADORES LÓGICOS
// ############################################################################

// EXPLICACIÓN PRÁCTICA
//
// $and: se deben cumplir todas las condiciones.
// $or: basta con que se cumpla alguna.
// $nor: no se cumple ninguna de las condiciones indicadas.
// $not: niega una condición de campo.
//
// Un AND sencillo puede escribirse poniendo varios campos en el mismo objeto.
// $and es especialmente útil cuando se necesitan condiciones repetidas
// sobre un mismo campo o cuando la consulta es compleja.
//
// EJERCICIO 4.1
// Busca productos con qty distinta de 10 Y qty menor que 70.

var query = {$and: [
    { qty: {$ne: 10}},
    { qty: {$lt: 70}}
    ]}
db.inventory.find(query)
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find({
//     $and: [
//         { qty: { $ne: 10 } },
//         { qty: { $lt: 70 } }
//     ]
// })


// EJERCICIO 4.2
// Busca productos cuyo precio sea menor que 5 O mayor que 50.
//
// TU SOLUCIÓN:

var query = {
    $or: [
        {price: {$lt: 5}},
        {price: {$gt: 50}}
        ]
}
db.inventory.find(query)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find({
//     $or: [
//         { price: { $lt: 5 } },
//         { price: { $gt: 50 } }
//     ]
// })


// EJERCICIO 4.3
// Busca productos que no tengan qty igual a 100 ni qty igual a 10.
//
// TU SOLUCIÓN:


var query = {
    $nor: [
        {qty: 100},
        {qty: 10}
        ]
}

db.inventory.find(query)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find({
//     $nor: [
//         { qty: 100 },
//         { qty: 10 }
//     ]
// })
// Explicación: $nor excluye los documentos que cumplen cualquiera de esas
// condiciones. Los documentos sin qty también pueden aparecer.


// EJERCICIO 4.4
// Busca productos cuyo precio NO sea mayor que 20.


var query = {
    price: {$not: {$gt: 20}}
}

var query_2 = {price: {$lte: 20}}

db.inventory.find(query)
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find({ price: { $not: { $gt: 20 } } })
// Nota: $not es un operador de campo; no equivale a una cláusula SQL WHERE
// independiente. Ten cuidado con campos ausentes y tipos diferentes.


// ############################################################################
// 5. CAMPOS AUSENTES, NULL Y TIPOS
// ############################################################################

// EXPLICACIÓN PRÁCTICA
//
// $exists: true  -> el campo existe, aunque su valor sea null.
// $exists: false -> el campo no existe.
//
// Estos dos casos NO son lo mismo:
//
// { campo: null } encuentra campos null y también campos ausentes.
// { campo: { $exists: false } } encuentra campos ausentes.
// { campo: { $type: "null" } } encuentra campos existentes con valor null.
//
// $type permite comprobar el tipo BSON del valor.
//
// EJERCICIO 5.1
// Busca cuadros que no tengan el campo year.

var query = {
    year: {$exists: false}
}

db.arts.find({query})
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.arts.find({ year: { $exists: false } })


// EJERCICIO 5.2
// Busca cuadros que tengan el campo price.

var query  = {
    price: {$exists: true}
}
db.arts.find(query)
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.arts.find({ price: { $exists: true } })


// EJERCICIO 5.3
// Busca cuadros cuyo campo year exista y tenga valor null.
//
// TU SOLUCIÓN:


db.arts.find( 
    {year: {$type: "null"}}
    )
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.arts.find({ year: { $type: "null" } })
// Inicialmente no hay ninguno: todavía existen cuadros sin el campo year,
// pero no hay cuadros con year igual a null.


// EJERCICIO 5.4
// Añade year: null a los cuadros que no tengan el campo year.
//
// TU SOLUCIÓN:

var query  = {year: {$exists: false}}
var modif = {$set: {year: null}}
db.arts.updateMany(query, modif)

// __________________________________________________________________________
//
// SOLUCIÓN:
// db.arts.updateMany(
//     { year: { $exists: false } },
//     { $set: { year: null } }
// )
// Explicación: tras esta actualización ya no quedan cuadros sin year,
// aunque algunos tienen un valor nulo.


// EJERCICIO 5.5
// Comprueba que ya no existen cuadros sin el campo year.
//

db.arts.find( 
    {year: {$exists: false}}
    )
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.arts.find({ year: { $exists: false } })


// ############################################################################
// 6. ACTUALIZAR Y ELIMINAR DOCUMENTOS
// ############################################################################

// EXPLICACIÓN PRÁCTICA
//
// updateOne(filtro, operación) modifica como máximo un documento.
// updateMany(filtro, operación) modifica todos los documentos coincidentes.
//
// $set: crea o cambia un campo.
// $unset: elimina un campo.
// deleteOne: elimina un documento coincidente.
// deleteMany: elimina todos los documentos coincidentes.
//
// ATENCIÓN: un filtro vacío {} afecta a todos los documentos en updateMany
// y deleteMany.
//
// EJERCICIO 6.1
// Añade el campo oferta: false a todos los productos.


var operation = {$set: {oferta: false}}

db.inventory.updateMany({}, operation)
//

db.inventory.find()
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.updateMany(
//     {},
//     { $set: { oferta: false } }
// )


// EJERCICIO 6.2
// Cambia a oferta: true los productos con precio superior a 30.

var query = {
    price: {$gt: 30}
}

var operation = {$set: {oferta: true}}
db.inventory.updateMany(query, operation)
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.updateMany(
//     { price: { $gt: 30 } },
//     { $set: { oferta: true } }
// )


// EJERCICIO 6.3
// Elimina el campo oferta de todos los productos.

var operation = {
    $unset: {oferta: ""}
}
db.inventory.updateMany({}, operation)
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.updateMany(
//     {},
//     { $unset: { oferta: "" } }
// )
// El valor de $unset no importa: se utiliza para indicar qué campo se elimina.


// EJERCICIO 6.4
// Inserta un producto temporal con item: "borrar" y qty: 1.
// Después, elimínalo sin tocar los demás.

var query = {
    item: "borrar",
    qty: 1
}
db.inventory.insertOne(query)



var query = {
    item: "borrar",
    qty: 1
}
db.inventory.deleteOne(query)


//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.insertOne({ item: "borrar", qty: 1 })
// db.inventory.deleteOne({ item: "borrar" })
// Explicación: el filtro concreto evita borrar accidentalmente todo el inventario.


// EJERCICIO 6.5
// Cambia el precio de las medias a 2.5.

db.inventory.find()

var query = {
    item: "medias"
}

var operation = {
    $set: {price: 2.5}
}
db.inventory.updateMany(query, operation)
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.updateOne(
//     { item: "medias" },a
//     { $set: { price: 2.5 } }
// )


// ############################################################################
// 7. DOCUMENTOS EMBEBIDOS
// ############################################################################

// EXPLICACIÓN PRÁCTICA
//
// Un documento puede contener otro documento:
//
// size: { h: 28, w: 35.5, uom: "cm" }
//
// Para acceder a un campo interno se usa la notación con puntos:
//
// "size.h"
// "size.uom"
//
// OJO: "size": { h: 28, uom: "cm" } comprueba la igualdad del documento
// completo indicado, no simplemente dos campos internos.
//
// EJERCICIO 7.1
// Busca productos cuya altura size.h sea exactamente 56.
//
// TU SOLUCIÓN:

var query = {
    "size.h": 56
}
db.inventoryE.find(query)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryE.find({ "size.h": 56 })


// EJERCICIO 7.2
// Busca productos cuya altura sea menor que 15 y cuyas unidades sean cm.



var query = {
    "size.h": {$lt: 15}, 
    "size.uom": "cm"
}

db.inventoryE.find(query)

//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryE.find({
//     "size.h": { $lt: 15 },
//     "size.uom": "cm"
// })


// EJERCICIO 7.3
// Busca productos cuyo documento size sea exactamente
// { h: 28, w: 35.5, uom: "cm" }.

var query = {size: { h: 28, w: 35.5, uom: "cm" }}

db.inventoryE.find(query)
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryE.find({
//     size: { h: 28, w: 35.5, uom: "cm" }
// })
// En una comparación de igualdad de documentos importan los campos y su orden.


// EJERCICIO 7.4
// Busca productos con altura superior a 50 y muestra item y size.h.


var query = {
    "size.h": {$gt: 50}
}

var proy = {
    item: 1, 
    "size.h": 1, 
    _id: 0
    
}
db.inventoryE.find(query, proy)
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryE.find(
//     { "size.h": { $gt: 50 } },
//     { _id: 0, item: 1, "size.h": 1 }
// )


// ############################################################################
// 8. ARRAYS: CONSULTAR ELEMENTOS
// ############################################################################

// EXPLICACIÓN PRÁCTICA
//
// Si tag es ["algodon", "seda"], MongoDB permite consultar el array de varias
// maneras:
//
// { tag: ["algodon", "seda"] }
//   -> igualdad con el array completo, mismo orden y mismos elementos.
//
// { tag: "seda" }
//   -> el array contiene el valor "seda".
//
// { tag: { $all: ["algodon", "seda"] } }
//   -> contiene los dos valores, sin exigir ese orden.
//
// { tag: { $in: ["seda", "licra"] } }
//   -> contiene al menos uno de esos valores.
//
// { "tag.0": "algodon" }
//   -> el primer elemento del array es "algodon".
//
// { tag: { $size: 2 } }
//   -> el array tiene exactamente dos elementos.
//
// EJERCICIO 8.1
// Busca productos cuyo array tag sea exactamente ["algodon", "seda"].
//
// TU SOLUCIÓN:


var query = {
    tag: ["algodon", "seda"]
}
db.inventoryA.find(query)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryA.find({ tag: ["algodon", "seda"] })


// EJERCICIO 8.2
// Busca productos que tengan las etiquetas "algodon" y "seda",
// sin importar el orden.


var query = {
    tag: {$all: ["algodon", "seda"]}
}

db.inventoryA.find(query)
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryA.find({ tag: { $all: ["algodon", "seda"] } })


// EJERCICIO 8.3
// Busca productos que tengan "seda" o "licra".

var query = {
    tag: {$in: ["seda", "licra"]}
}

db.inventoryA.find(query)
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryA.find({ tag: { $in: ["seda", "licra"] } })


// EJERCICIO 8.4
// Busca productos cuyo primer tag sea "algodon".

var query = {
   "tag.0" : "algodon"
}
   
db.inventoryA.find(query)
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryA.find({ "tag.0": "algodon" })


// EJERCICIO 8.5
// Busca productos que tengan exactamente dos etiquetas.
//
var query = {
    tag: {$size: 2}
}
db.inventoryA.find(query)

// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryA.find({ tag: { $size: 2 } })


// EJERCICIO 8.6
// Busca productos cuyo array tag NO contenga "seda" ni "licra".

var query = {
    tag: {$not: {$in: ["seda", "licra"]}}
}

db.inventoryA.find(query)
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryA.find({ tag: { $nin: ["seda", "licra"] } })
// Importante: $nin puede incluir documentos en los que tag no exista.


// EJERCICIO 8.7
// Añade la etiqueta "borrar" a todos los productos sin duplicarla.

var operation = {
    $addToSet: {tag: "borrar"}
}

db.inventoryA.updateMany({}, operation)


db.inventoryA.find()
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryA.updateMany(
//     {},
//     { $addToSet: { tag: "borrar" } }
// )
// $addToSet añade el valor solo si todavía no existe.


// EJERCICIO 8.8
// Añade la etiqueta "nuevo" a todos los productos, aunque se repita.
//
// TU SOLUCIÓN:

var query = {}
var operation ={
    $push: {tag: "nuevo"}
}

db.inventoryA.updateMany(query, operation)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryA.updateMany(
//     {},
//     { $push: { tag: "nuevo" } }
// )
// $push añade un elemento sin comprobar si ya existe.


// EJERCICIO 8.9
// Añade "etiqueta1" y "etiqueta2" a todos los arrays tag en una operación.
//
// TU SOLUCIÓN:


var query = {tag: {$exists: true}}
var operation = {$push: 
    {tag:
        {$each: ["etiqueta_1", "etiqueta_2"]}
    }
}

db.inventoryA.updateMany(query, operation)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryA.updateMany(
//     {},
//     { $push: { tag: { $each: ["etiqueta1", "etiqueta2"] } } }
// )


// EJERCICIO 8.10
// Elimina de todos los arrays tag todas las apariciones de "borrar".


var query = {}
var operation = {
    $pull: {tag: "borrar"}
}
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryA.updateMany(
//     {},
//     { $pull: { tag: "borrar" } }
// )
// $pull elimina todos los elementos del array que coinciden con la condición.


// EJERCICIO 8.11
// Elimina el último elemento de cada array tag.
//
// TU SOLUCIÓN:


db.inventoryA.updateMany({}, 
    {$pop: {tag: 1}}
)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryA.updateMany({}, { $pop: { tag: 1 } })
// $pop: 1 elimina el último elemento; $pop: -1 elimina el primero.
// Ejecuta esta operación solo cuando quieras modificar los datos.


// ############################################################################
// 9. ARRAYS DE DOCUMENTOS
// ############################################################################

// EXPLICACIÓN PRÁCTICA
//
// Ahora size es un array:
//
// size: [
//     { h: 28, w: 35.5, uom: "cm" },
//     { h: 56, w: 47, uom: "pu" }
// ]
//
// { "size.w": 35.5 }
// Busca documentos cuyo array size contenga algún documento con w = 35.5.
//
// { "size.0.w": 35.5 }
// Examina el campo w del documento situado en la posición 0.
//
// $elemMatch permite exigir que varias condiciones se cumplan en un mismo
// elemento del array.
//
// Sin $elemMatch, diferentes elementos pueden satisfacer las condiciones.
//
// EJERCICIO 9.1
// Busca productos cuyo array size contenga algún elemento con w = 35.5.
//
// TU SOLUCIÓN:


var query = {"size.w": 35.5}

db.inventoryAE.find(query)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryAE.find({ "size.w": 35.5 })


// EJERCICIO 9.2
// Busca productos cuyo primer documento de size tenga w = 35.5.
//
// TU SOLUCIÓN:

var query = {"size.0.w": 35.5}

db.inventoryAE.find(query)


// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryAE.find({ "size.0.w": 35.5 })


// EJERCICIO 9.3
// Busca productos cuyo array size contenga un mismo documento con w = 35.5
// y uom = "cm".


var query = {
    size: {
        $elemMatch: {
            w: 35.5, 
            uom: "cm"}}
        }
    
    
db.inventoryAE.find(query)
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryAE.find({
//     size: {
//         $elemMatch: {
//             w: 35.5,
//             uom: "cm"
//         }
//     }
// })


// EJERCICIO 9.4
// Busca productos en los que algún elemento de size tenga altura superior a 30
// e inferior o igual a 110.
//
// TU SOLUCIÓN:

var query = {
    size: 
    {$elemMatch: {
        h: {$gt: 30, $lte: 110}
        }
    }
}

db.inventoryAE.find(query)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryAE.find({
//     size: {
//         $elemMatch: {
//             h: { $gt: 30, $lte: 110 }
//         }
//     }
// })


// EJERCICIO 9.5
// Busca productos que tengan algún elemento de size con altura menor que 10
// y algún elemento con altura mayor que 50. No tienen por qué ser el mismo.
//

var query = {
    $and:
        [{size: {$elemMatch: {h: {$gt: 30}}}},
         {size: {$elemMatch: {h: {$lte: 110}}}}]
}

db.inventoryAE.find(query)

// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryAE.find({
//     "size.h": { $lt: 10 },
//     "size.h": { $gt: 50 }
// })
// ATENCIÓN: esta solución no es correcta como consulta JavaScript: la segunda
// clave size.h sobrescribe la primera.
//
// Forma correcta: utilizar $and para expresar las dos condiciones.
//
// db.inventoryAE.find({
//     $and: [
//         { "size.h": { $lt: 10 } },
//         { "size.h": { $gt: 50 } }
//     ]
// })
// Cada condición puede cumplirse en un elemento distinto del array.


// ############################################################################
// 10. ORDENAR, LIMITAR, SALTAR Y CONTAR
// ############################################################################

// EXPLICACIÓN PRÁCTICA
//
// sort({ qty: 1 })  -> ascendente.
// sort({ qty: -1 }) -> descendente.
//
// limit(n) muestra como máximo n documentos.
// skip(n) salta los primeros n documentos.
// countDocuments(filtro) cuenta los documentos que cumplen el filtro.
//
// Es recomendable ordenar por un campo adicional único si necesitas un orden
// reproducible cuando varios documentos tienen el mismo valor.
//
// EJERCICIO 10.1
// Ordena todos los productos por qty de mayor a menor.
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//

var order = {qty: -1}
db.inventoryAE.find().sort(order)


// SOLUCIÓN:
// db.inventory.find().sort({ qty: -1 })


// EJERCICIO 10.2
// Muestra el producto con mayor precio.
//
// TU SOLUCIÓN:

db.inventory.find().sort({price: -1}).limit(1)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find().sort({ price: -1 }).limit(1)


// EJERCICIO 10.3
// Muestra los tres productos más baratos.
//
// TU SOLUCIÓN:

db.inventory.find().sort({price: 1}).limit(3)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find().sort({ price: 1 }).limit(3)


// EJERCICIO 10.4
// Ordena por qty descendente y muestra los documentos cuarto, quinto y sexto.

db.inventory.find().sort({qty: -1}).skip(3).limit(3)
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find().sort({ qty: -1, _id: 1 }).skip(3).limit(3)


// EJERCICIO 10.5
// Cuenta cuántos productos tienen qty mayor que 20.
//
// TU SOLUCIÓN:


var filter = {
    qty: {$gt: 20}
}

db.inventory.countDocuments(filter)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.countDocuments({ qty: { $gt: 20 } })


// EJERCICIO 10.6
// Devuelve todos los documentos de inventory como un array de JavaScript.
//
// TU SOLUCIÓN:

db.inventory.find({}).toArray()
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventory.find({}).toArray()
// toArray() materializa los resultados del cursor en un array.


// ############################################################################
// 11. AGREGACIÓN: ENTENDER EL PIPELINE
// ############################################################################

// EXPLICACIÓN PRÁCTICA
//
// aggregate([ETAPA1, ETAPA2, ETAPA3])
//
// Imagina una cadena de montaje: cada etapa recibe los documentos que salen
// de la etapa anterior.
//
// $match     -> filtra documentos.
// $project   -> selecciona campos o calcula nuevos.
// $addFields -> añade campos sin eliminar los demás.
// $group     -> agrupa documentos y calcula métricas.
// $sort      -> ordena.
// $limit     -> limita el resultado.
// $unwind    -> convierte cada elemento de un array en un documento separado.
//
// Un pipeline no es una consulta SQL escrita en otro idioma: cada etapa
// transforma el resultado que recibe.
//
// EJERCICIO 11.1
// Filtra únicamente las camisetas de inventoryE.
//
// TU SOLUCIÓN:


var query1 = {item: "camiseta"}
var fase1 = {$match: query1}
var etapas = [fase1]

db.inventoryE.aggregate(etapas)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryE.aggregate([
//     { $match: { item: "camiseta" } }
// ])


// EJERCICIO 11.2
// Filtra las camisetas y muestra solamente item y price, sin _id.
//
// TU SOLUCIÓN:

var query1 = {item: "camiseta"}
var fase1 = {$match: query1}

var query2 = {item: 1, price: 1, _id: 0}
var fase2 = {$project: query2}

var etapas = [fase1, fase2]

db.inventoryE.aggregate(etapas)

// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryE.aggregate([
//     { $match: { item: "camiseta" } },
//     { $project: { _id: 0, item: 1, price: 1 } }
// ])


// EJERCICIO 11.3
// Añade un campo llamado importe_total que sea qty multiplicado por price.
//
// TU SOLUCIÓN:


var query1 = {item: "camiseta"}
var fase1 = {$match: query1}

var query2 = {importe_total: {$multiply: ["$qty", "$price"]}}
var fase2 = {$addFields: query2}

var etapas = [fase1, fase2]

db.inventoryE.aggregate(etapas)

// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryE.aggregate([
//     {
//         $addFields: {
//             importe_total: { $multiply: ["$qty", "$price"] }
//         }
//     }
// ])
// El símbolo $ delante de qty o price indica que se utiliza el valor del campo.


// EJERCICIO 11.4
// Cuenta cuántos documentos existen para cada item.
//

var query1 = {"_id": "$item", "numero": {$sum: 1}}
var fase1 = {$group: query1}
var etapas = [fase1]

db.inventoryE.aggregate(etapas)
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryE.aggregate([
//     {
//         $group: {
//             _id: "$item",
//             numero: { $sum: 1 }
//         }
//     }
// ])
// En $group, _id indica la clave de agrupación.
// $sum: 1 suma una unidad por cada documento del grupo.


// EJERCICIO 11.5
// Cuenta los documentos por item y ordena por el número de documentos,
// de mayor a menor.
//
// TU SOLUCIÓN:


var query1 = {"_id": "$item", "numero": {$sum: 1}}
var fase1 = {$group: query1}
var query2 = {numero: -1}
var fase2 = {$sort: query2}

var etapas = [fase1, fase2]

db.inventoryE.aggregate(etapas)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryE.aggregate([
//     {
//         $group: {
//             _id: "$item",
//             numero: { $sum: 1 }
//         }
//     },
//     { $sort: { numero: -1 } }
// ])


// EJERCICIO 11.6
// Calcula, para cada item, el número de documentos, la cantidad total,
// el precio mínimo y el precio máximo.
//
// TU SOLUCIÓN:


var query1 = {
        "_id": "$item",
        "numero": {$sum: 1}, 
        "qty_total": {$sum: "$qty"}, 
        "min_price": {$min: "$price"},
        "max_price": {$max: "$price"}
}
var fase1 = {$group: query1}

var etapas = [fase1]

db.inventoryE.aggregate(etapas)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryE.aggregate([
//     {
//         $group: {
//             _id: "$item",
//             documentos: { $sum: 1 },
//             cantidad_total: { $sum: "$qty" },
//             precio_minimo: { $min: "$price" },
//             precio_maximo: { $max: "$price" }
//         }
//     }
// ])


// EJERCICIO 11.7
// Para cada item, calcula el importe total de sus productos y ordena
// de mayor a menor importe.
//
// TU SOLUCIÓN:

var query0 = {"importe_total": {$multiply: ["$price", "$qty"]}}
var fase0 = {$addFields: query0}
var query1 = {"_id": "$item", "importe_total_acumulado": {$sum: "$importe_total"}}
var fase1 = {$group: query1}
var query2 = {"importe_total_acumulado": -1}
var fase2 = {$sort: query2}

var etapas = [ fase0, fase1, fase2]

db.inventoryE.aggregate(etapas)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryE.aggregate([
//     {
//         $addFields: {
//             importe_total: { $multiply: ["$qty", "$price"] }
//         }
//     },
//     {
//         $group: {
//             _id: "$item",
//             importe_acumulado: { $sum: "$importe_total" }
//         }
//     },
//     { $sort: { importe_acumulado: -1 } }
// ])


// EJERCICIO 11.8
// Agrupa por item y crea un array cantidades que contenga los campos qty y
// price de cada documento.
//
// TU SOLUCIÓN:


var query0 = {qty: "$qty", price: "$price"}
var query1 = {_id: "$item", cantidades: {$push: query0}}
var fase1 = {$group: query1}

var etapas = [fase1]

db.inventoryE.aggregate(etapas)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryE.aggregate([
//     {
//         $group: {
//             _id: "$item",
//             cantidades: {
//                 $push: { qty: "$qty", price: "$price" }
//             }
//         }
//     }
// ])
// $push conserva cada elemento dentro de un array, incluso si se repite.


// EJERCICIO 11.9
// Agrupa por item y tag, convierte ambos a mayúsculas y cuenta documentos.
// Ordena de mayor a menor cantidad.
//
// TU SOLUCIÓN:


var query1 = {"_id": 
                {
                "item": {$toUpper: "$item"},
                "tag": {$toUpper: "$tag"}
                },
            "cuenta": {$sum: 1}
}
var fase1 = {$group: query1}
var query2 = {"cuenta": -1}
var fase2 = {$sort: query2}
var etapas = [fase1, fase2]

db.inventoryE.aggregate(etapas)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryE.aggregate([
//     {
//         $group: {
//             _id: {
//                 item: { $toUpper: "$item" },
//                 tag: { $toUpper: "$tag" }
//             },
//             total: { $sum: 1 }
//         }
//     },
//     { $sort: { total: -1 } }
// ])




// ############################################################################
// 12. AGREGACIÓN: MEDIA, MÍNIMO, MÁXIMO Y FILTROS POR GRUPO
// ############################################################################

// EXPLICACIÓN PRÁCTICA
//
// $avg calcula la media.
// $min calcula el mínimo.
// $max calcula el máximo.
// $sum suma valores; $sum: 1 cuenta documentos.
//
// MUY IMPORTANTE:
//
// $match ANTES de $group filtra documentos individuales.
// $match DESPUÉS de $group filtra grupos ya calculados.
//
// Por tanto, si quieres seleccionar grupos cuya media sea mayor que 12,
// primero calculas la media con $group y después filtras con $match.
//
// EJERCICIO 12.1
// Calcula la media de puntuación de todos los restaurantes italianos.
//
// TU SOLUCIÓN:

var query1 = {cuisine: "Italian"}
var fase1 = {$match: query1}

var query2 = {_id: null, avg_score: {$avg: "$score"}}
var fase2 = {$group: query2}

var etapas = [fase1, fase2]
db.restaurantes.aggregate(etapas)


// __________________________________________________________________________
//
// SOLUCIÓN:
// db.restaurantes.aggregate([
//     { $match: { cuisine: "Italian" } },
//     {
//         $group: {
//             _id: null,
//             media: { $avg: "$score" }
//         }
//     }
// ])
// _id: null agrupa todos los documentos filtrados en un único grupo.


// EJERCICIO 12.2
// Calcula la media de score por borough.
//

var query1 = {_id: "borough", media_score: {$avg: "$score"}}
var fase1 = {$group: query1}
var etapas = [fase1]

db.restaurantes.aggregate(etapas)


// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.restaurantes.aggregate([
//     {
//         $group: {
//             _id: "$borough",
//             media: { $avg: "$score" }
//         }
//     }
// ])


// EJERCICIO 12.3
// Calcula la media de score por borough y cuisine.
// Ordena de mayor a menor media.
//
// TU SOLUCIÓN:

var query1 = {"_id": {
                    "borough": "$borough",
                    "cuisine": "$cuisine"}, 
                "avg_score": {$avg: "$score"}
}
var fase1 = {$group: query1} 

var query2 = {avg_score: -1}
var fase2 = {$sort: query2}

var etapas = [fase1, fase2]

db.restaurantes.aggregate(etapas)

// __________________________________________________________________________
//
// SOLUCIÓN:
// db.restaurantes.aggregate([
//     {
//         $group: {
//             _id: { borough: "$borough", cuisine: "$cuisine" },
//             media: { $avg: "$score" }
//         }
//     },
//     { $sort: { media: -1 } }
// ])


// EJERCICIO 12.4
// Repite el ejercicio anterior, pero conserva únicamente los grupos con
// media superior a 12.
//
// TU SOLUCIÓN:

var query1 = {"_id": {
                    "borough": "$borough",
                    "cuisine": "$cuisine"}, 
                "avg_score": {$avg: "$score"}
}
var fase1 = {$group: query1} 

var query2 = {avg_score: -1}
var fase2 = {$sort: query2}

var query3 = {avg_score: {$gt: 12}}
var fase3 = {$match: query3}

var etapas = [fase1, fase2, fase3]

db.restaurantes.aggregate(etapas)

// __________________________________________________________________________
//
// SOLUCIÓN:
// db.restaurantes.aggregate([
//     {
//         $group: {
//             _id: { borough: "$borough", cuisine: "$cuisine" },
//             media: { $avg: "$score" }
//         }
//     },
//     { $match: { media: { $gt: 12 } } },
//     { $sort: { media: -1 } }
// ])
// Aquí media ya existe porque se ha creado en $group.
// Por eso se puede filtrar después mediante $match.


// EJERCICIO 12.5
// Cuenta cuántos restaurantes tienen cada grade y ordena por frecuencia.
//
// TU SOLUCIÓN:

var query1 = {"_id": "$grade", frecuencia: {$sum: 1}}
var fase1 = {$group: query1}

var query2 = {frecuencia: 1}
var fase2 = {$sort: query2}

etapas = [fase1, fase2]

db.restaurantes.aggregate(etapas)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.restaurantes.aggregate([
//     {
//         $group: {
//             _id: "$grade",
//             cuenta: { $sum: 1 }
//         }
//     },
//     { $sort: { cuenta: -1 } }
// ])


// EJERCICIO 12.6
// Filtra restaurantes American, con grade A y score entre 8 y 12,
// ambos incluidos. Agrupa por borough y calcula número de documentos,
// media, máximo y mínimo. Ordena por media descendente.
//


db.restaurantes.find({cuisine: {$eq: "American"}})

var query1 = {cuisine: {$eq: "American"}, grade: {$eq: "A"}, score: {$gte: 8, $lte: 12}}
var fase1 = {$match: query1}

var query2 = {"_id": "$borough",
            conteo: {$sum: 1},
            media: {$avg: "$score"},
            max: {$max: "$score"},
            min: {$min: "$score"}
}
var fase2 = {$group: query2}

var etapas = [fase1, fase2]

db.restaurantes.aggregate(etapas)


// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.restaurantes.aggregate([
//     {
//         $match: {
//             cuisine: "American",
//             grade: "A",
//             score: { $gte: 8, $lte: 12 }
//         }
//     },
//     {
//         $group: {
//             _id: "$borough",
//             conteo: { $sum: 1 },
//             media: { $avg: "$score" },
//             maximo: { $max: "$score" },
//             minimo: { $min: "$score" }
//         }
//     },
//     { $sort: { media: -1 } }
// ])


// EJERCICIO 12.7
// Calcula por borough y cuisine la media y el número de valoraciones.
// Conserva grupos con media superior a 10 y al menos dos documentos.
//
// TU SOLUCIÓN:

var query1 = {"_id": 
                    {borough: "$borough",
                     cuisine: "$cuisine"
                    },
            media: {$avg: "$score"},
            num_vals: {$sum: 1}
    
}

var fase1 = {$group: query1}

var query2 = {media: {$gt: 10}, num_vals: {$gte: 2}}
var fase2 = {$match: query2}


db.restaurantes.aggregate([fase1, fase2])

// __________________________________________________________________________
//
// SOLUCIÓN:
// db.restaurantes.aggregate([
//     {
//         $group: {
//             _id: { borough: "$borough", cuisine: "$cuisine" },
//             media: { $avg: "$score" },
//             cantidad: { $sum: 1 }
//         }
//     },
//     {
//         $match: {
//             media: { $gt: 10 },
//             cantidad: { $gte: 2 }
//         }
//     },
//     { $sort: { media: -1 } }
// ])


// ############################################################################
// 13. $UNWIND: DESMONTAR ARRAYS
// ############################################################################

// EXPLICACIÓN PRÁCTICA
//
// $unwind convierte cada elemento de un array en un documento independiente.
//
// Si un producto tiene dos elementos en size, tras $unwind aparecerán
// dos documentos con el mismo producto y un único elemento size en cada uno.
//
// Esto permite calcular estadísticas sobre los elementos del array.
//
// EJERCICIO 13.1
// Descompón el array size de inventoryAE.
//
// TU SOLUCIÓN:


db.inventoryAE.find()


var fase1 = {$unwind: "$size"}

db.inventoryAE.aggregate([fase1])


// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryAE.aggregate([
//     { $unwind: "$size" }
// ])


// EJERCICIO 13.2
// Descompón size y muestra item, size.h y size.uom.


var fase1 = {$unwind: "$size"}

var query2 = {_id: 0, item: "$item", "size.h": "$size.h", "size.uom": "$size.uom"}
var fase2 = {$project: query2}


db.inventoryAE.aggregate([fase1, fase2,  {$sort: {"size.h": -1}}])

//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryAE.aggregate([
//     { $unwind: "$size" },
//     {
//         $project: {
//             _id: 0,
//             item: 1,
//             altura: "$size.h",
//             unidad: "$size.uom"
//         }
//     }
// ])


// EJERCICIO 13.3
// Calcula la altura media de las medidas de cada item.
// Recuerda descomponer size antes de agrupar.
//
// TU SOLUCIÓN:



var fase1 = {$unwind: "$size"}

var query2 = {"_id": "$item", "avg_size_h": {$avg: "$size.h"}}
var fase2 = {$group: query2}


db.inventoryAE.aggregate([fase1, fase2])

// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryAE.aggregate([
//     { $unwind: "$size" },
//     {
//         $group: {
//             _id: "$item",
//             altura_media: { $avg: "$size.h" }
//         }
//     }
// ])


// ############################################################################
// 14. SUBCONSULTAS CON $PUSH, $UNWIND Y $REPLACEWITH
// ############################################################################

// EXPLICACIÓN PRÁCTICA
//
// Vamos a calcular qué porcentaje de las ventas de cada trimestre corresponde
// a cada región.
//
// PASOS MENTALES:
//
// 1. $group agrupa por trimestre.
// 2. $sum calcula el total trimestral.
// 3. $push crea un array con la información de cada región.
// 4. $unwind vuelve a separar las regiones.
// 5. $replaceWith y $mergeObjects combinan los datos del trimestre
//    con los de cada región.
// 6. $addFields calcula el porcentaje regional.
//
// EJERCICIO 14.1
// Agrupa por quarter, suma qty y crea un array items que contenga region y qty.
//

db.ventas.find()

var query0 = {region: "$region", qty: "$qty"}
var fase0 = {$push: query0}

var query1 = {_id: "$quarter", total_qty: {$sum: "$qty"}, items: fase0}
var fase1 = {$group: query1}


var etapas = [fase1]

db.ventas.aggregate(etapas)

// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.ventas.aggregate([
//     {
//         $group: {
//             _id: "$quarter",
//             total: { $sum: "$qty" },
//             items: {
//                 $push: { region: "$region", qty: "$qty" }
//             }
//         }
//     }
// ])


// EJERCICIO 14.2
// Partiendo de la agrupación anterior, convierte cada elemento items en
// un documento independiente.
//
// TU SOLUCIÓN:




var query0 = {region: "$region", qty: "$qty"}
var fase0 = {$push: query0}

var query1 = {_id: "$quarter", total_qty: {$sum: "$qty"}, items: fase0}
var fase1 = {$group: query1}


var fase2 = {$unwind: "$items"} 

var etapas = [fase1, fase2]

db.ventas.aggregate(etapas)


// __________________________________________________________________________
//
// SOLUCIÓN:
// db.ventas.aggregate([
//     {
//         $group: {
//             _id: "$quarter",
//             total: { $sum: "$qty" },
//             items: {
//                 $push: { region: "$region", qty: "$qty" }
//             }
//         }
//     },
//     { $unwind: "$items" }
// ])


// EJERCICIO 14.3
// Devuelve un documento por región y trimestre, con quarter, total, region
// y qty en el mismo nivel.
//
// TU SOLUCIÓN:


var query1 = {_id: "$quarter", 
             total: {$sum: "$qty"},
             items: {$push: {region: "$region", qty: "$qty"}}
}

var fase1 = {$group: query1}


var fase2 = {$unwind: "$items"}



var query3 = {quarter: "$_id", total: "$total"}

var fase3 = {$replaceWith: { $mergeObjects: [query3, "$items"]}}

var etapas =[fase1, fase2, fase3]

db.ventas.aggregate(etapas)


// __________________________________________________________________________
//
// SOLUCIÓN:
// db.ventas.aggregate([
//     {
//         $group: {
//             _id: "$quarter",
//             total: { $sum: "$qty" },
//             items: {
//                 $push: { region: "$region", qty: "$qty" }
//             }
//         }
//     },
//     { $unwind: "$items" },
//     {
//         $replaceWith: {
//             $mergeObjects: [
//                 { quarter: "$_id", total: "$total" },
//                 "$items"
//             ]
//         }
//     }
// ])
// $mergeObjects combina documentos. Si hay claves repetidas, prevalece el
// valor del documento que aparece más tarde en la lista.


// EJERCICIO 14.4
// Añade porcentaje, que sea qty dividido entre total y multiplicado por 100.
//
// TU SOLUCIÓN:



var query1 = {_id: "$quarter", 
             total: {$sum: "$qty"},
             items: {$push: {region: "$region", qty: "$qty"}}
}

var fase1 = {$group: query1}


var fase2 = {$unwind: "$items"}



var query3 = {quarter: "$_id", total: "$total"}

var fase3 = {$replaceWith: { $mergeObjects: [query3, "$items"]}}

var query4 = { pct: {$multiply: [{$divide: ["$qty", "$total"]}, 100] }}

var fase4 = {$addFields: query4}

var etapas =[fase1, fase2, fase3, fase4]

db.ventas.aggregate(etapas)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.ventas.aggregate([
//     {
//         $group: {
//             _id: "$quarter",
//             total: { $sum: "$qty" },
//             items: {
//                 $push: { region: "$region", qty: "$qty" }
//             }
//         }
//     },
//     { $unwind: "$items" },
//     {
//         $replaceWith: {
//             $mergeObjects: [
//                 { quarter: "$_id", total: "$total" },
//                 "$items"
//             ]
//         }
//     },
//     {
//         $addFields: {
//             porcentaje: {
//                 $multiply: [
//                     { $divide: ["$qty", "$total"] },
//                     100
//                 ]
//             }
//         }
//     },
//     { $sort: { quarter: 1, region: 1 } }
// ])


// ############################################################################
// 15. CONCATENAR CADENAS Y CAMBIAR MAYÚSCULAS
// ############################################################################

// EXPLICACIÓN PRÁCTICA
//
// $concat une cadenas de texto.
// $toUpper convierte a mayúsculas.
// $toLower convierte a minúsculas.
//
// En una agregación, "$street" significa el valor del campo street.
// ", " es texto literal.
//
// EJERCICIO 15.1
// Muestra una dirección nueva que concatene street, una coma y zipcode,
// convirtiéndola a mayúsculas. No muestres _id.


db.restaurantes.find()

var fase1 = {$project: 
                {_id: 0,
                direccion: 
                    {$toUpper: {$concat: ["$street", ", ", "$zipcode"]}}
                    
                }
            }


db.restaurantes.aggregate([fase1])

//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.restaurantes.aggregate([
//     {
//         $project: {
//             _id: 0,
//             direccion: {
//                 $toUpper: {
//                     $concat: ["$street", ", ", "$zipcode"]
//                 }
//             }
//         }
//     }
// ])


// EJERCICIO 15.2
// Muestra name en minúsculas y cuisine en mayúsculas.
//
// TU SOLUCIÓN:


var fase1 = {$project: 
                {_id: 0,
                direccion: {$toLower: "$name"},
                cocina: {$toUpper: "$cuisine"}
                }
            }
            
db.restaurantes.aggregate([fase1])

// __________________________________________________________________________
//
// SOLUCIÓN:
// db.restaurantes.aggregate([
//     {
//         $project: {
//             _id: 0,
//             nombre_minusculas: { $toLower: "$name" },
//             cocina_mayusculas: { $toUpper: "$cuisine" }
//         }
//     }
// ])


// ############################################################################
// 16. FECHAS: CONVERTIR, EXTRAER AÑO Y MES, AGRUPAR
// ############################################################################

// EXPLICACIÓN PRÁCTICA
//
// Una fecha guardada como cadena de texto no es automáticamente una fecha BSON.
//
// $toDate convierte una cadena compatible a una fecha.
//
// $year extrae el año.
// $month extrae el mes, del 1 al 12.
// $dateDiff calcula la diferencia entre fechas.
// $dateSubtract resta un intervalo temporal.
//
// Para agrupar por año o por año y mes, primero conviene convertir la fecha.
//
// EJERCICIO 16.1
// Convierte fecha en fecha_date y muestra ambos campos.

db.fechas.find()

var query1 = {$toDate: "$fecha"} 
var fase1 = {$addFields: {fecha_date: query1}}


var etapas = [fase1]
db.fechas.aggregate(etapas)
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.fechas.aggregate([
//     {
//         $addFields: {
//             fecha_date: { $toDate: "$fecha" }
//         }
//     }
// ])


// EJERCICIO 16.2
// Añade los campos anio y mes a cada documento.
//
// TU SOLUCIÓN:



var query1 = {$toDate: "$fecha"} 
var fase1 = {$addFields: {fecha_date: query1}}

var query2 = {mes: {$month: "$fecha_date"}, 
              anio: {$year: "$fecha_date"}}
              
var fase2 = {$addFields: query2}

var etapas = [fase1, fase2]
db.fechas.aggregate(etapas)

// __________________________________________________________________________
//
// SOLUCIÓN:
// db.fechas.aggregate([
//     {
//         $addFields: {
//             fecha_date: { $toDate: "$fecha" }
//         }
//     },
//     {
//         $addFields: {
//             anio: { $year: "$fecha_date" },
//             mes: { $month: "$fecha_date" }
//         }
//     }
// ])


// EJERCICIO 16.3
// Filtra las fechas que correspondan a enero de 2024.
//
// TU SOLUCIÓN:


var query1 = {$toDate: "$fecha"} 
var fase1 = {$addFields: {fecha_date: query1}}

var query2 = {mes: {$month: "$fecha_date"}, 
              anio: {$year: "$fecha_date"}}
              
var fase2 = {$addFields: query2}


var query3 = {mes: 1, anio: 2024}
var fase3  = {$match: query3}

var etapas = [fase1, fase2, fase3]
db.fechas.aggregate(etapas)

// __________________________________________________________________________
//
// SOLUCIÓN:
// db.fechas.aggregate([
//     {
//         $addFields: {
//             fecha_date: { $toDate: "$fecha" }
//         }
//     },
//     {
//         $addFields: {
//             anio: { $year: "$fecha_date" },
//             mes: { $month: "$fecha_date" }
//         }
//     },
//     {
//         $match: {
//             anio: 2024,
//             mes: 1
//         }
//     }
// ])


// EJERCICIO 16.4
// Agrupa por año y suma qty.
//
// TU SOLUCIÓN:


var query1 = {$toDate: "$fecha"} 
var fase1 = {$addFields: {fecha_date: query1}}

var query2 = {mes: {$month: "$fecha_date"}, 
              anio: {$year: "$fecha_date"}}
              
var fase2 = {$addFields: query2}


var query3 = {_id: "$anio", 
              total: {$sum: "$qty"}}
              
var fase3  = {$group: query3}


var etapas = [fase1, fase2, fase3]
db.fechas.aggregate(etapas)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.fechas.aggregate([
//     {
//         $addFields: {
//             fecha_date: { $toDate: "$fecha" }
//         }
//     },
//     {
//         $group: {
//             _id: { $year: "$fecha_date" },
//             suma: { $sum: "$qty" }
//         }
//     },
//     { $sort: { _id: 1 } }
// ])


// EJERCICIO 16.5
// Agrupa por año y mes, sumando qty.



var query1 = {$toDate: "$fecha"} 
var fase1 = {$addFields: {fecha_date: query1}}

var query2 = {mes: {$month: "$fecha_date"}, 
              anio: {$year: "$fecha_date"}}
              
var fase2 = {$addFields: query2}


var query3 = {_id: 
                {anio: "$anio", 
                 mes: "$mes"},
              total: {$sum: "$qty"}}
              
var fase3  = {$group: query3}


var etapas = [fase1, fase2, fase3]
db.fechas.aggregate(etapas)

//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.fechas.aggregate([
//     {
//         $addFields: {
//             fecha_date: { $toDate: "$fecha" }
//         }
//     },
//     {
//         $group: {
//             _id: {
//                 anio: { $year: "$fecha_date" },
//                 mes: { $month: "$fecha_date" }
//             },
//             suma: { $sum: "$qty" }
//         }
//     },
//     { $sort: { "_id.anio": 1, "_id.mes": 1 } }
// ])


// EJERCICIO 16.6
// Calcula la diferencia en días entre cada fecha y el momento actual.
// Conserva fecha, fecha_date y diferencia_dias.
//
// TU SOLUCIÓN:



var query1 = {$toDate: "$fecha"} 
var fase1 = {$addFields: {fecha_date: query1}}

var query2 = {anio: {$year: "$fecha_date"},
              diff_dias: {$dateDiff: { 
                  startDate: "$fecha_date",
                  endDate: "$$NOW",
                  unit: "day",
              }}}
              
var fase2 = {$addFields: query2}

var query3 = {_id: 0, fecha: "$fecha", fecha_date: "$fecha_date", diff_dias: "$diff_dias"}
var fase3 = {$project: query3}

var etapas = [fase1, fase2, fase3]
db.fechas.aggregate(etapas)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.fechas.aggregate([
//     {
//         $addFields: {
//             fecha_date: { $toDate: "$fecha" }
//         }
//     },
//     {
//         $addFields: {
//             diferencia_dias: {
//                 $dateDiff: {
//                     startDate: "$fecha_date",
//                     endDate: "$$NOW",
//                     unit: "day"
//                 }
//             }
//         }
//     },
//     {
//         $project: {
//             _id: 0,
//             fecha: 1,
//             fecha_date: 1,
//             diferencia_dias: 1
//         }
//     }
// ])
// Un resultado positivo indica que la fecha está antes del momento actual.
// $$NOW representa el instante actual de la operación de agregación.


// EJERCICIO 16.7
// Crea un campo fecha_menos_dos_dias restando dos días a fecha_date.
//
// TU SOLUCIÓN:

var query1 = {$toDate: "$fecha"} 
var fase1 = {$addFields: {fecha_date: query1}}

var query2 = {fecha_menos_2_dias: {$dateSubtract: { 
    startDate: "$fecha_date",
    unit: "day",
    amount: 2,
}}}
             
var fase2 = {$addFields: query2}


var etapas = [fase1, fase2]
db.fechas.aggregate(etapas)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.fechas.aggregate([
//     { $addFields: { fecha_date: { $toDate: "$fecha" } } },
//     {
//         $addFields: {
//             fecha_menos_dos_dias: {
//                 $dateSubtract: {
//                     startDate: "$fecha_date",
//                     unit: "day",
//                     amount: 2
//                 }
//             }
//         }
//     }
// ])


// ############################################################################
// 17. CADENAS: SPLIT, REPLACEALL Y CONVERSIÓN A NÚMEROS
// ############################################################################

// EXPLICACIÓN PRÁCTICA
//
// Imagina que un campo contiene:
//
// "-$100,56~$1000,23"
//
// Es una sola cadena, pero representa dos precios.
//
// $split divide una cadena utilizando un separador y devuelve un array.
// $unwind separa los elementos del array en documentos diferentes.
// $replaceAll sustituye todas las apariciones de una cadena.
// $toDecimal convierte una cadena numérica válida a Decimal128.
//
// La secuencia mental es:
//
// texto original
//     -> separar por ~
//     -> quitar el símbolo $
//     -> cambiar la coma decimal por un punto
//     -> convertir a número.
//
// EJERCICIO 17.1
// Separa el campo precio por el símbolo ~ y guarda el resultado en precios.
//
// TU SOLUCIÓN:
db.precios.find()

var fase1 = {$addFields: {precios: {$split: ["$precio", "~"]}}}


var etapas = [fase1]

db.precios.aggregate(etapas)
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.precios.aggregate([
//     {
//         $addFields: {
//             precios: { $split: ["$precio", "~"] }
//         }
//     }
// ])


// EJERCICIO 17.2
// Separa los precios y devuelve un documento por cada elemento de precios.
//

var fase1 = {$addFields: {precios: {$split: ["$precio", "~"]}}}

var fase2 = {$unwind: "$precios"}

var fase3 = {$project: {_id: 0, producto: "$producto", precios: "$precios"}}

var etapas = [fase1, fase2, fase3]

db.precios.aggregate(etapas)

// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.precios.aggregate([
//     { $addFields: { precios: { $split: ["$precio", "~"] } } },
//     { $unwind: "$precios" }
// ])


// EJERCICIO 17.3
// Separa los precios y elimina el símbolo $ de cada elemento.
//

var fase1 = {$addFields: {precios: {$split: ["$precio", "~"]}}}

var fase2 = {$unwind: "$precios"}

var fase3 = {$project: {_id: 0, producto: "$producto", precios: "$precios"}}


var query4 = {$replaceAll: { input: "$precios", find: { $literal: "$" }, replacement: "" }}
var fase4 = {$addFields: {precio_limpio: query4}}

var etapas = [fase1, fase2, fase3, fase4]

db.precios.aggregate(etapas)


// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.precios.aggregate([
//     { $addFields: { precios: { $split: ["$precio", "~"] } } },
//     { $unwind: "$precios" },
//     {
//         $addFields: {
//             precio_limpio: {
//                 $replaceAll: {
//                     input: "$precios",
//                     find: { $literal: "$" },
//                     replacement: ""
//                 }
//             }
//         }
//     }
// ])
// $literal indica que "$" es el carácter que se quiere buscar,
// no una referencia a un campo.


// EJERCICIO 17.4
// Haz lo anterior y sustituye la coma decimal por un punto.
//



var fase1 = {$addFields: {precios: {$split: ["$precio", "~"]}}}

var fase2 = {$unwind: "$precios"}

var fase3 = {$project: {_id: 0, producto: "$producto", precios: "$precios"}}


var query4 = {$replaceAll: { input: "$precios", find: { $literal: "$" }, replacement: "" }}
var fase4 = {$addFields: {precio_limpio: query4}}

var fase5 = {$addFields: {precio_limpio: {$replaceAll: { input: "$precio_limpio", find: ",", replacement: "." }}}}

var etapas = [fase1, fase2, fase3, fase4, fase5]

db.precios.aggregate(etapas)
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.precios.aggregate([
//     { $addFields: { precios: { $split: ["$precio", "~"] } } },
//     { $unwind: "$precios" },
//     {
//         $addFields: {
//             precio_limpio: {
//                 $replaceAll: {
//                     input: "$precios",
//                     find: { $literal: "$" },
//                     replacement: ""
//                 }
//             }
//         }
//     },
//     {
//         $addFields: {
//             precio_con_punto: {
//                 $replaceAll: {
//                     input: "$precio_limpio",
//                     find: ",",
//                     replacement: "."
//                 }
//             }
//         }
//     }
// ])


// EJERCICIO 17.5
// Completa el proceso y convierte el precio limpio a Decimal128.
// Conserva producto, precio original, precio_con_punto y precio_numero.
//
// TU SOLUCIÓN:


var fase1 = {$addFields: {precios: {$split: ["$precio", "~"]}}}

var fase2 = {$unwind: "$precios"}

var fase3 = {$project: {_id: 0, producto: "$producto", precios: "$precios"}}


var query4 = {$replaceAll: { input: "$precios", find: { $literal: "$" }, replacement: "" }}
var fase4 = {$addFields: {precio_limpio: query4}}

var fase5 = {$addFields: {precio_limpio: {$replaceAll: { input: "$precio_limpio", find: ",", replacement: "." }}}}


var fase6 = {$addFields: {precio: {$toDecimal: "$precio_limpio"}}}

var fase7 = {$project: {_id: 0, producto: "$producto", precios: "$precio"}}


var etapas = [fase1, fase2, fase3, fase4, fase5, fase6, fase7]

db.precios.aggregate(etapas)


// __________________________________________________________________________
//
// SOLUCIÓN:
// db.precios.aggregate([
//     { $addFields: { precios: { $split: ["$precio", "~"] } } },
//     { $unwind: "$precios" },
//     {
//         $addFields: {
//             precio_limpio: {
//                 $replaceAll: {
//                     input: "$precios",
//                     find: { $literal: "$" },
//                     replacement: ""
//                 }
//             }
//         }
//     },
//     {
//         $addFields: {
//             precio_con_punto: {
//                 $replaceAll: {
//                     input: "$precio_limpio",
//                     find: ",",
//                     replacement: "."
//                 }
//             }
//         }
//     },
//     {
//         $addFields: {
//             precio_numero: { $toDecimal: "$precio_con_punto" }
//         }
//     },
//     {
//         $project: {
//             _id: 0,
//             producto: 1,
//             precio: 1,
//             precio_con_punto: 1,
//             precio_numero: 1
//         }
//     }
// ])
// Nota: $toDecimal convierte cadenas numéricas válidas. Si una cadena contiene
// símbolos o formatos no válidos, puede producir un error de conversión.


// ############################################################################
// 18. EJERCICIOS FINALES: MEZCLA DE OPERADORES
// ############################################################################

// EXPLICACIÓN PRÁCTICA
//
// Aquí no se indica qué operador debes utilizar.
// Primero traduce el enunciado a pasos:
//
// 1. ¿Qué documentos necesito seleccionar? -> $match o find.
// 2. ¿Necesito campos concretos? -> proyección o $project.
// 3. ¿Necesito calcular algo por documento? -> $addFields.
// 4. ¿Necesito agrupar? -> $group.
// 5. ¿Necesito filtrar grupos? -> $match después de $group.
// 6. ¿Necesito ordenar o limitar? -> $sort y $limit.
//
// EJERCICIO 18.1
// Busca productos de inventoryE con qty mayor que 20 y precio menor que 30.
// Muestra item, qty, price e importe_total = qty * price.
// Ordena por importe_total descendente.
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryE.aggregate([
//     { $match: { qty: { $gt: 20 }, price: { $lt: 30 } } },
//     {
//         $addFields: {
//             importe_total: { $multiply: ["$qty", "$price"] }
//         }
//     },
//     {
//         $project: {
//             _id: 0,
//             item: 1,
//             qty: 1,
//             price: 1,
//             importe_total: 1
//         }
//     },
//     { $sort: { importe_total: -1 } }
// ])


// EJERCICIO 18.2
// De los restaurantes italianos, calcula por borough la media, el máximo,
// el mínimo y el número de valoraciones. Conserva solo los barrios con
// una media superior a 12 y ordena de mayor a menor media.
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.restaurantes.aggregate([
//     { $match: { cuisine: "Italian" } },
//     {
//         $group: {
//             _id: "$borough",
//             media: { $avg: "$score" },
//             maximo: { $max: "$score" },
//             minimo: { $min: "$score" },
//             valoraciones: { $sum: 1 }
//         }
//     },
//     { $match: { media: { $gt: 12 } } },
//     { $sort: { media: -1 } }
// ])


// EJERCICIO 18.3
// Busca productos de inventoryA que tengan "algodon" y "fino",
// cuyo precio sea superior a 15. Muestra item, price y tag.
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryA.find(
//     {
//         tag: { $all: ["algodon", "fino"] },
//         price: { $gt: 15 }
//     },
//     {
//         _id: 0,
//         item: 1,
//         price: 1,
//         tag: 1
//     }
// )


// EJERCICIO 18.4
// En inventoryAE, descompón size y calcula la altura máxima y mínima
// por item. Ordena por altura máxima descendente.
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.inventoryAE.aggregate([
//     { $unwind: "$size" },
//     {
//         $group: {
//             _id: "$item",
//             altura_maxima: { $max: "$size.h" },
//             altura_minima: { $min: "$size.h" }
//         }
//     },
//     { $sort: { altura_maxima: -1 } }
// ])


// EJERCICIO 18.5
// Para cada año de las fechas, calcula el número de documentos,
// la suma de qty y la media de qty.
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.fechas.aggregate([
//     { $addFields: { fecha_date: { $toDate: "$fecha" } } },
//     {
//         $group: {
//             _id: { $year: "$fecha_date" },
//             documentos: { $sum: 1 },
//             cantidad_total: { $sum: "$qty" },
//             cantidad_media: { $avg: "$qty" }
//         }
//     },
//     { $sort: { _id: 1 } }
// ])


// EJERCICIO 18.6
// En restaurantes, agrupa por borough y grade. Calcula la media de score
// y el número de documentos. Conserva grupos con al menos dos documentos
// y una media inferior a 15. Ordena por media ascendente.
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.restaurantes.aggregate([
//     {
//         $group: {
//             _id: { borough: "$borough", grade: "$grade" },
//             media: { $avg: "$score" },
//             cantidad: { $sum: 1 }
//         }
//     },
//     {
//         $match: {
//             cantidad: { $gte: 2 },
//             media: { $lt: 15 }
//         }
//     },
//     { $sort: { media: 1 } }
// ])


// EJERCICIO 18.7
// Calcula el porcentaje de ventas por región dentro de cada trimestre.
// Devuelve quarter, region, qty, total y porcentaje. Ordena por trimestre
// y, dentro de cada trimestre, por porcentaje descendente.
//
// TU SOLUCIÓN:
// __________________________________________________________________________
//
// SOLUCIÓN:
// db.ventas.aggregate([
//     {
//         $group: {
//             _id: "$quarter",
//             total: { $sum: "$qty" },
//             items: {
//                 $push: { region: "$region", qty: "$qty" }
//             }
//         }
//     },
//     { $unwind: "$items" },
//     {
//         $replaceWith: {
//             $mergeObjects: [
//                 { quarter: "$_id", total: "$total" },
//                 "$items"
//             ]
//         }
//     },
//     {
//         $addFields: {
//             porcentaje: {
//                 $multiply: [
//                     { $divide: ["$qty", "$total"] },
//                     100
//                 ]
//             }
//         }
//     },
//     { $sort: { quarter: 1, porcentaje: -1 } }
// ])


// ############################################################################
// FIN DE LA PRÁCTICA
// ############################################################################
//
// 1. ¿Qué documentos quiero?                  -> find / $match
// 2. ¿Qué campos quiero ver?                  -> proyección / $project
// 3. ¿Quiero modificar datos?                 -> update / $set / $unset
// 4. ¿Quiero calcular resultados agrupados?    -> aggregate / $group
//
// ============================================================================