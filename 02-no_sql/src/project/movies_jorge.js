use master


//1. Analizar con find la colección.

db.movies.find()

// 2. Contar cuántos documentos (películas) tiene cargado.

db.movies.countDocuments()

//  3. Insertar una película.

var product = {
    title: "The Man from Earth",
    year: 1990, 
    cast: ["John Billingsley", "Tony Todd", "David Lee Smith"],
    genres: ["Science Fiction"]
}

db.movies.insertOne(product)

//  4. Borrar la película insertada en el punto anterior (en el 3).


var product = {
    title: "The Man from Earth",
    year: 1990, 
    cast: ["John Billingsley", "Tony Todd", "David Lee Smith"],
    genres: ["Science Fiction"]
}

db.movies.deleteOne(product)

//  5. Contar cuantas películas tienen actores (cast) que se llaman “and”. Estos nombres de actores están por ERROR. 


var query = {cast: "and"}
db.movies.countDocuments(query)

//  6. Actualizar los documentos cuyo actor (cast) tenga por error el valor “and” como si realmente fuera un actor. Para 
// ello, se debe sacar únicamente ese valor del array cast. Por lo tanto, no se debe eliminar ni el documento (película) ni
// su array cast con el resto de actores.



var query = {cast: "and"}
var operation = {$pull: query}

db.movies.updateMany(query, operation)



//  7. Contar cuantos documentos (películas) tienen el array ‘cast’ vacío. 

var query = {cast: []}
db.movies.countDocuments(query)


//  8. Actualizar TODOS los documentos (películas) que tengan el array cast vacío, añadiendo un nuevo elemento dentro
// del array con valor Undefined. Cuidado! El tipo de cast debe seguir siendo un array. 

var query = {cast: []}
var operation = {$push: {cast: "Undefined"}}
db.movies.updateMany(query, operation)


//  9. Contar cuantos documentos (películas) tienen el array genres vacío.

var query = {genres: []}
db.movies.countDocuments(query)



//  10. Actualizar TODOS los documentos (películas) que tengan el array genres vacío, añadiendo un nuevo elemento
// dentro del array con valor Undefined. 
var query = {genres: []}
var operation = {$push: {genres: "Undefined"}}
db.movies.updateMany(query, operation)


//  11. Mostrar el año más reciente / actual que tenemos sobre todas las películas.


var proyec = {_id: 0, year: 1}
var order = {year: -1}
db.movies.find({}, proyec).sort(order).limit(1).toArray()[0].year


//  12. Contar cuántas películas han salido en los últimos 20 años. Debe hacerse desde el último año que se tienen
// registradas películas en la colección, no desde la fecha actual, mostrando el resultado total de esos años, no el
// resultado por año. Revisar que no se cuentan 21 años. Se debe hacer con el Framework de Agregación.



var proyec = {_id: 0, year: 1}
var order = {year: -1}
var max_year = db.movies.find({}, proyec).sort(order).limit(1).toArray()[0].year

var query1 = {year: {$gte: max_year - 19}} 
// Para no contar contar 21 años, resto 19 al año máximo 
// Ejemplo: pelis en los 2 últimos años --> tendría que restar 1. Así: 2025, 2026 (2 años)
var fase1 = {$match: query1}

var query2 = {_id: null, conteo: {$sum: 1}}
var fase2 = {$group: query2}

var fase3 = {$project: {peliculas_ultimos_20_años: "$conteo", _id: 0}}

var etapas = [fase1, fase2, fase3]

db.movies.aggregate(etapas)



//  13. Contar cuántas películas han salido en la década de los 60 (del 60 al 69 incluidos). Se debe hacer con el Framework
// de Agregación.


var query1 = {year: {$gte: 1960, $lte: 1969}} 
var fase1 = {$match: query1}

var query2 = {_id: null, conteo: {$sum: 1}}
var fase2 = {$group: query2}

var fase3 = {$project: {peliculas_decada_60: "$conteo", _id: 0}}

var etapas = [fase1, fase2, fase3]

db.movies.aggregate(etapas)


//  14. Mostrar el año u años con más películas mostrando el número de películas de ese año. Revisar si varios años
// pueden compartir tener el mayor número de películas.

var query1 = {_id: "$year", num_peliculas: {$sum: 1}}
var fase1 = {$group: query1}

var query2 = {_id: "$num_peliculas",
             years_new: {$push: "$_id"}
}
var fase2 = {$group: query2}

var fase3 = {$sort: {_id: -1}}

var fase4 = {$limit: 1}

var fase5 = {$unwind: "$years_new"}

var query6 = {años: "$years_new", num_peliculas: "$_id", _id: 0}
var fase6 = {$project: query6}

var etapas = [fase1, fase2, fase3, fase4, fase5, fase6]

db.movies.aggregate(etapas)



//  15. Mostrar el año u años con menos películas mostrando el número de películas de ese año. Revisar si varios años
// pueden compartir tener el menor número de películas.


var query1 = {_id: "$year", num_peliculas: {$sum: 1}}
var fase1 = {$group: query1}

var query2 = {_id: "$num_peliculas",
             years_new: {$push: "$_id"}
}
var fase2 = {$group: query2}

var fase3 = {$sort: {_id: 1}}

var fase4 = {$limit: 1}

var fase5 = {$unwind: "$years_new"}

var query6 = {años: "$years_new", num_peliculas: "$_id", _id: 0}
var fase6 = {$project: query6}

var etapas = [fase1, fase2, fase3, fase4, fase5, fase6]

db.movies.aggregate(etapas)

//  16. Guardar en nueva colección llamada “actors” realizando la fase $unwind por cast, no se debe agrupar de nuevo y
// debe contener todas las claves (title,year,cast,genres). Después, contar cuantos documentos existen en la nueva
// colección.

var fase1 = { $unwind: "$cast" }

var fase2 = { $project: { _id: 0, title: 1, year: 1, cast: 1, genres: 1 } }

var fase3 = { $out: "actors" }


var etapas = [fase1, fase2, fase3]

db.movies.aggregate(etapas)

db.actors.countDocuments()

//  17. Sobre actors (nueva colección), mostrar la lista con los 5 actores que han participado en más películas mostrando el
// número de películas en las que ha participado. Importante! Se necesita previamente filtrar para descartar aquellos
// actores llamados "Undefined". Aclarar que no se eliminan de la colección, sólo que filtramos para que no aparezcan.



var query1 = {cast: {$ne: "Undefined"}}
var fase1 = {$match: query1}

var query2 = {_id: "$cast", conteo: {$sum: 1}}
var fase2 = {$group: query2}

var fase3 = {$sort: {conteo: -1, _id: 1}}
// Me piden lista con exactamente 5 actores. Sé que no hay empates de ningún tipo, 
// pero si lo hubiese, ordeno por nombre, ascendentemente

var fase4 = {$limit: 5}

var query5 = {actor: "$_id", num_peliculas: "$conteo", _id:0}
var fase5 = {$project: query5}


var etapas = [fase1, fase2, fase3, fase4, fase5]

db.actors.aggregate(etapas)


//  18. Sobre actors (nueva colección), agrupar por película y año mostrando las 5 en las que más actores hayan
// participado, mostrando el número total de actores.


var query1 = {_id: 
                {pelicula: "$title", 
                year: "$year"},
            num_actores: {$sum: 1}
}
var fase1 = {$group: query1}

var fase2 = {$sort: {num_actores: -1}}
var fase3 = {$limit: 5}

var fase4 = {$project: {_id: 0, pelicula: "$_id.pelicula", year: "$_id.year", num_actores:1}}

var etapas = [fase1, fase2, fase3, fase4]

db.actors.aggregate(etapas)


//  19. Sobre actors (nueva colección), mostrar los 5 actores cuya carrera haya sido la más larga. Para ello, se debe
// mostrar cuándo comenzó su carrera, cuándo finalizó y cuántos años ha trabajado. Importante! Se necesita previamente
// filtrar para descartar aquellos actores llamados "Undefined". Aclarar que no se eliminan de la colección, sólo que
// filtramos para que no aparezcan.




var query1 = {cast: {$ne: "Undefined"}}
var fase1 = {$match: query1}

var query2 = {_id: "$cast", 
              inicio: {$min: "$year"},
              fin: {$max: "$year"}
}
var fase2 = {$group: query2}

var query3 = {_id: 0, actor: "$_id", inicio: 1, fin: 1, 
            years_working: {$add: [{$subtract: ["$fin", "$inicio"]}, 1]}
}
var fase3 = {$project: query3}


var fase4 = {$sort: {years_working: -1}}
var fase5 = {$limit: 5 }

db.actors.aggregate([fase1, fase2, fase3, fase4, fase5])

//  20. Sobre actors (nueva colección), Guardar en nueva colección llamada “genres” realizando la fase $unwind por
// genres, no se debe agrupar de nuevo y debe contener todas las claves (title,year,cast,genres). Después, contar cuantos
// documentos existen en la nueva colección.


var fase1 = { $unwind: "$genres" }

var fase2 = { $project: { _id: 0, title: 1, year: 1, cast: 1, genres: 1 } }

var fase3 = { $out: "genres" }


var etapas = [fase1, fase2, fase3]

db.actors.aggregate(etapas)

db.genres.countDocuments()


//  21. Sobre genres (nueva colección), mostrar los 5 documentos agrupados por “Año y Género” que más número de
// películas diferentes tienen mostrando el número total de películas. Importante! Se necesita previamente filtrar para
// descartar aquellos genres llamados "Undefined". Aclarar que no se eliminan de la colección, sólo que filtramos para
// que no aparezcan.


var query1 = {genres: {$ne: "Undefined"}}
var fase1 = {$match: query1}

var query2 = {_id: 
                {year: "$year", 
                 genres: "$genres",
                 title: "$title"
                }
}
var fase2 = {$group: query2}
// Agrupo a todos los actores en un mismo documento.

var query3 = {_id: 
                {year: "$_id.year", 
                 genres: "$_id.genres",
                },
              total_peliculas: {$sum: 1}
}
// Cuento todas las peliculas de cada genero en cada año

var fase3 = {$group: query3}


var fase4 = {$sort: {total_peliculas: -1, "_id.year": 1}}
// Si hubiese empate, filtro por año ascendente

var fase5 = {$limit: 5 } 


var query6 = {year: "$_id.year", genres: "$_id.genres", total_peliculas: "$total_peliculas", _id: 0}
var fase6 = {$project: query6}

var etapas = [fase1, fase2, fase3, fase4, fase5, fase6]
db.genres.aggregate(etapas)


//  22. Sobre genres (nueva colección), mostrar los 5 actores y los géneros en los que han participado con más número de
// géneros diferentes, se debe mostrar tanto el número de géneros diferentes que ha interpretado como los diferentes
// géneros además del nombre del actor. Importante! Se necesita previamente filtrar para descartar aquellos actores
// llamados "Undefined". Aclarar que no se eliminan de la colección, sólo que filtramos para que no aparezcan.




var query1 = {cast: {$ne: "Undefined"}, genres: {$ne: "Undefined"}}
// Aunque no lo diga el enunciado, quito también los géneros "Undefined"
var fase1 = {$match: query1}

var query2 = {_id:"$cast", generos_distintos: {$addToSet: "$genres"}}
var fase2 = {$group: query2}

var query3 = {actor: "$_id", generos: "$generos_distintos", total_generos: {$size: "$generos_distintos"}, _id: 0}
var fase3 = {$project: query3}

var fase4 = {$sort: {total_generos: -1, actor: 1}}
// Por si hay empate, también se ordena en orden alfabético del actor
var fase5 = {$limit: 5}

var etapas = [fase1, fase2, fase3, fase4, fase5]
db.genres.aggregate(etapas)




//  23. Sobre genres (nueva colección), mostrar las 5 películas y su año correspondiente en los que más géneros diferentes
// han sido catalogados, mostrando esos géneros y el número de géneros que contiene. Importante! Se necesita
// previamente filtrar para descartar aquellos genres llamados "Undefined". Aclarar que no se eliminan de la colección,
// sólo que filtramos para que no aparezcan.

var query1 = {genres: {$ne: "Undefined"}}
var fase1 = {$match: query1}

var query2 = {_id: {title: "$title", year: "$year"}, 
                generos_unicos: {$addToSet: "$genres"}
    
}
var fase2 = {$group: query2}

var query3 = {_id: 0, pelicula: "$_id.title", year: "$_id.year", 
                generos: "$generos_unicos", num_generos: {$size: "$generos_unicos"}}


var fase3 = {$project: query3} 

var fase4 = {$sort: {num_generos: -1, pelicula: 1}}
// Por si hay empate, también ordeno en orden alfabético por película

var fase5 = {$limit: 5}

var etapas = [fase1, fase2, fase3, fase4, fase5]

db.genres.aggregate(etapas)



//  24. Mostrar los 5 pares de actores que más películas han compartido juntos, 
// mostrando las películas en las que han trabajado conjuntamente. 

var query1 = {cast: {$ne: "Undefined"}}
var fase1 = {$match: query1}

var query2 = {"cast.1": {$exists: true}}
var fase2 = {$match: query2}


var query3 = {title: "$title", actor1: "$cast", actor2: "$cast"}
var fase3 = {$project: query3}

// Genero todas las posibles parejas de actores para cada película
var fase4 = {$unwind: "$actor1"}
var fase5 = {$unwind: "$actor2"}


// Elimino los documentos con actor1 = actor 2
var query6 = {$expr: {$ne: ["$actor1", "$actor2"]}}
var fase6 = {$match: query6}

// Hasta este punto, tengo duplicidad: para una mimsa película, tengo un documento: "actor1 = A, actor2 = B",
// y otro docuemento: "actor1 = B, actor2 = A". Para quedarme solo con uno de ellos, exijo que el orden alfabético
// del actor1 sea menor que el de actor 2 (e.g.: Ana < Bob, Carla < Clara)
var query7 = {$expr: {$lt: ["$actor1", "$actor2"]}}
var fase7 = {$match: query7}


var query8 = {_id: 
                {actor1: "$actor1",
                 actor2: "$actor2"},
             conteo: {$sum: 1},
             peliculas: {$push: "$title"}
}

var fase8 = {$group: query8}

var fase9 = {$sort: {conteo: -1, "_id.actor1": 1}}
// Como siempre, utilizo también otro filtro por si hay empate en el primero
var fase10 = {$limit: 5}

var queryfin = {pareja: ["$_id.actor1", "$_id.actor2"],
                num_peliculas_juntos: "$conteo",
                peliculas_juntos: "$peliculas",
                _id: 0
}
var fasefin = {$project: queryfin}

var etapas = [fase1, fase2, fase3, fase4, fase5, fase6, fase7, fase8, fase9, fase10, fasefin]

db.movies.aggregate(etapas)


//  25. Mostrar el número distinto de géneros que ha habido en cada década (XXX0 - XXX9)


var query1 = {genres: {$ne: "Undefined"}}
var fase1 = {$match: query1}

var fase2 = {$unwind: "$genres"}

var query3 = {_id: 
                {$subtract: ["$year", {$mod: ["$year", 10]}]
                },
            generos: {$addToSet: "$genres"},
            }
var fase3 = {$group: query3}

var query4 = {decada: {$concat: [{$toString: "$_id"}, "s"]}, 
            num_generos_distintos: {$size: "$generos"}, 
            generos: "$generos",
            _id: 0
            }
            
var fase4 = {$project: query4}

var fase5 = {$sort: {decada: 1}}
                    

var etapas = [fase1, fase2, fase3, fase4, fase5]

db.movies.aggregate(etapas)


//  26. Calcular métricas estadísticas (media, máximo, mínimo) de actores por película según el género


var query1 = {cast: {$ne: "Undefined"}, genres: {$ne: "Undefined"}}
var fase1 = {$match: query1}


var fase2 = {$unwind: "$genres"}

var query3 = {genres: "$genres", cast_size: {$size: "$cast"}}
var fase3 = {$project: query3}

var query4 = {_id: "$genres",
              media_actores: {$avg: "$cast_size"},
              max_actores: {$max: "$cast_size"},
              min_actores: {$min: "$cast_size"},
              peliculas_totales: {$sum: 1}
}
var fase4 = {$group: query4}


var query5 = {_id: 0, genero: "$_id", media_actores: {$round: ["$media_actores", 2]},
              max_actores: "$max_actores", min_actores: "$min_actores", peliculas_totales: "$peliculas_totales"
}
var fase5 = {$project: query5}

var fase6 = {$sort: {max_actores: -1, min_actores: -1}}
var fase7 = {$limit: 5}
var etapas = [fase1, fase2, fase3, fase4, fase5, fase6, fase7]

db.movies.aggregate(etapas)
