//Se importa mongoose, una biblioteca para trabajar con bases de datos de Mongo DB en Node.js

const mongoose = require("mongoose")
/*
Definimos un esquema de mongoose llamado Encargadoschema, que describe como se va a estructurar el 
documento dentro de la colección de mongo
*/
const EncargadoSchema = mongoose.Schema({
    name: {
        type:String
    },
    study: {
        type:String
    },
    turn: {
        type:String
    }
}) 
/*
Creamos un modelo llamado products basado en el esquema Encargadoshema donde se crea una 
instancia de mongoose.model donde toma dos parámetros el nombre del modelo y el esquema que 
define la estructura de los documentos anteriormente creada y se exorte el modelo 
*/
module.exports =  mongoose.model('Encargado', EncargadoSchema)