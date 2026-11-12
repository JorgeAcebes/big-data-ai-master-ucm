use master



//  INSERT

// Creo mi JSON que quiero insertar
var new_item = {"item": "camiseta", "qty": 100, "price": 19.5, "tag": "algodon", "size_h": 28, "size_w": 35.5, "size_uom": "cm"} 

// Aquí es cuando lo inserto en la colección inventory
db.inventory.insertOne(new_item)

// Aquí lo busco

db.inventory.find()


// Veo cómo se ha creado esa nueva coleeción

show collections



// He aprendido que no puedo ejecutar una línea sin antes seleccionarla Ahora tengo que borrar un montón de documentos nuevos que he creado

db.inventory.deleteMany({
  _id: {
    $in: [
      ObjectId("6ae1cce01ab613916a5ac08e"),
      ObjectId("6ae1cd1a1ab613916a5ac08f"),
      ObjectId("6ae1cd2f1ab613916a5ac090"), 
      ObjectId("6ae1cd6d1ab613916a5ac091"),
      ObjectId("6ae1cf801ab613916a5ac092"), 
      ObjectId("6ae1d00c1ab613916a5ac093"), 
      ObjectId("6ae1d09c1ab613916a5ac094"), 
      ObjectId("6ae1d0de1ab613916a5ac095")
    ]
  }
});


// Compruebo que esté bien nuesrta colección

db.inventory.find()



// Ahora voy a añadir muchos documentos

var array_items = [
    {"item": "camiseta", "qty": 100, "price": 22.5, "tag": "carton", "size_h": 28, "size_w": 35.5, "size_uom": "cm"},
    {"item": "camiseta", "qty": 100, "price": 30.5, "tag": "licra", "size_h": 18, "size_w": 27.5, "size_uom": "cm"} 
    ]
    
db.inventory.insertMany(array_items)


var array_more_items= [
    { "item": "camiseta", "qty": 100, "price": 19.5, "tag": "algodon", "size_h": 28, "size_w": 35.5,
"size_uom": "cm" } ,
    { "item": "camiseta", "qty": 100, "price": 22.5, "tag": "algodon", "size_h": 56, "size_w": 47,
"size_uom": "pu" } ,
    { "item": "medias", "qty": 10, "price": 1.5, "tag": "licra", "size_h": 2, "size_w": 3, "size_uom":
"cm" } ,
    { "item": "corbata", "qty": 6, "price": 5.5, "tag": "algodon", "size_h": 5, "size_w": 4, "size_uom":
"cm" } ,
    { "item": "camiseta", "qty": 78, "price": 10.5, "tag": "carton", "size_h": 4, "size_w": 1,
"size_uom": "cm" }
]

db.inventory.insertMany( array_more_items )


// Vamos a filtrar


db.inventory.find({tag: "algodon", qty: 100})


db.inventory.find(
        {$or: [{tag: "algodon"}, {tag: "licra"}]}
        )
        

db.inventory.find()





// Proyecciones


// Inclusión explícita
db.inventory.find( {size_uom: "cm"}, {qty: 1, tag: 1, _id: 0} ) 

// Exclusión explícita


db.inventory.find({size_uom: "cm"}, {qty: 0, tag: 0, _id: 0})
