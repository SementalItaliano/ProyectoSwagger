//Se importa mongoose, una biblioteca para trabajar con bases de datos de Mongo DB en Node.js

const mongoose = require("mongoose")
/*
Definimos un esquema de mongoose llamado Areaschema, que describe como se va a estructurar el 
documento dentro de la colección de mongo
*/
const AreaSchema = mongoose.Schema({
    name: {
        type:String
    },
    built: {
        type:Number
    }
})

/*
Creamos un modelo llamado products basado en el esquema Areashema donde se crea una 
instancia de mongoose.model donde toma dos parámetros el nombre del modelo y el esquema que 
define la estructura de los documentos anteriormente creada y se exorte el modelo 
*/
module.exports =  mongoose.model('Area', AreaSchema)