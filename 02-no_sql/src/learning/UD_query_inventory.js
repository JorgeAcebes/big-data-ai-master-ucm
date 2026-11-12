use master



// Update


// Set

var query_all = {} // Lo dejo vacío porque voy a utilizarlo como filtro 

var operation = {$set: {available: "True"}}

db.inventory.updateMany(query_all, operation)

db.inventory.find()

// Unset

var query_all = {} // Lo dejo vacío porque voy a utilizarlo como filtro 

var op_unset = {$unset: {available: " "} }

db.inventory.updateMany(query_all, op_unset)


// Rename

var op_rename = {$rename: {"item": "product"}}

db.inventory.updateMany({}, op_rename)


// Delete


// Voy a crear un documento ficticio y después lo borraré

var reg = {"para": "borar"}
db.inventory.insertOne(reg)

db.inventory.find()

var reg = {"para": "borar"}
db.inventory.deleteMany(reg)


// Dominar el find

// Quality greater than 78, showing just quality and price.

var query_gt = {"qty": {$gt: 78}} 
db.inventory.find(query_gt, {qty: 1, price:1, _id: 0})


var query_in = {"tag": {$in: ["algodon", "carton"] }}
db.inventory.find(query_in)



// Operadores lógicos

// AND

var query_1 = {"qty": {$lt: 50}}
var query_2 = {"qty": {$ne: 4}}

var logic = {$and : [query_1, query_2]}
db.inventory.find(logic)


var query_3 = {"size_h": {$eq: 5}}
var query_4 = {"size_w": {$gte: 25}}

var logic = {$or: [query_3, query_4]}
db.inventory.find(logic)


var query_exists = {"qty": {$exists: true}}
db.inventory.find(query_exists)



// Vamos a crear el campo "no_existe" pero solamente para aquellas documentos donde no tengan todavía ese campo
var query = {"no_existe": {$exists: false}} // Va a ser mi filtro: todos los documentos donde no exista el campo "no_existe"
var set_op = {$set: {"no_existe": null}}
db.inventory.updateMany(query, set_op)


var query = {"no_existe": {$exists: true}} 
db.inventory.find(query)


var query_type = {"qty": {$type: "int"}}
db.inventory.find(query_type)




// Datos Embedidos


var array_items= [
{ "item": "camiseta", "qty": 100, "price": 19.5, "tag": "algodon", "size": { "h": 28, "w": 35.5,
"uom": "cm" } } ,
{ "item": "camiseta", "qty": 100, "price": 22.5, "tag": "algodon", "size": { "h": 56, "w": 47, "uom":
"pu" } },
{ "item": "medias", "qty": 10, "price": 1.5, "tag": "licra", "size": { "h": 2, "w": 3, "uom": "cm" } },
{ "item": "corbata", "qty": 6, "price": 5.5, "tag": "algodon", "size": { "h": 5, "w": 4, "uom": "cm" }
},
{ "item": "camiseta", "qty": 78, "price": 10.5, "tag": "carton", "size": { "h": 4, "w": 1, "uom": "cm"
} }
]
db.inventoryE.insertMany( array_items )


db.inventoryE.find()



// Vamos a hacer una consulta sobre el embedido


var query = {"size.h": {$gte: 28}}
db.inventoryE.find(query)


db.inventoryE.insertOne({"item": "sombrero", qty: 99, price: 20, tag: "fiber"})

db.inventoryE.deleteOne({_id: ObjectId("6ae30c351ab613916a5ac0b9")})




// Arrays

db.inventoryE.insertOne({"item": "sombrero", qty: 99, price: 20, tag: "fiber", gender: ["male", "female", "non-binary"]})

db.inventoryE.find()


db.inventoryE.find({gender: {$all: ["female", "male"]}})


var array_items= [
{ "item": "camiseta", "qty": 100, "price": 19.5, "tag": ["algodon","fino"], "size": { "h": 28, "w":
35.5, "uom": "cm" } } ,
{ "item": "camiseta", "qty": 100, "price": 22.5, "tag": ["algodon","fino"], "size": { "h": 56, "w": 47,
"uom": "pu" } },
{ "item": "medias", "qty": 10, "price": 1.5, "tag": ["licra"], "size": { "h": 2, "w": 3, "uom": "cm" } },
{ "item": "corbata", "qty": 6, "price": 5.5, "tag": ["algodon","seda"], "size": { "h": 5, "w": 4,
"uom": "cm" } },
{ "item": "camiseta", "qty": 78, "price": 10.5, "tag": ["carton","piedra"], "size": { "h": 4, "w": 1,
"uom": "cm" } }
]
db.inventoryA.insertMany( array_items )
db.inventoryA.find()




// Busco todos los documentos cuyos tags no sean ["algodón", "seda"]

var subquery = {$nin: ["algodon", "seda"]}
db.inventoryA.find({tag: {$elemMatch: subquery}})


// Busco todos los documentos cuyos tags no sean ["fino", "algodon"]
// Fíjate que no me obliga a que estén en el mismo orden

var subquery = {$nin: ["fino", "algodon"]}
db.inventoryA.find({tag: {$elemMatch: subquery}})




