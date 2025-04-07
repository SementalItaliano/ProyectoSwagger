/*
En la primer línea de código se impota la biblioteca boy-parser para analizar cuerpos de solicitudes 
HTTP y convertirlos en objetos JavaScript accesible en req.body
Luego se importa express, un marco de trabajo para node.js que facilita la creación de aplicaciones 
web y API’s
*/
const bodyParser = require("body-parser");
const express = require('express')

/*

Se crea una instancia de aplicación Express, que representa la aplicación web, se utiliza para 
configurar y manejar las rutas y middleware
Se importa cors que es un middleware para controlar el acceso a la aplicación web

*/
const app = express()
const cors = require('cors')

/*
Se importa el enrutador de productos desde un archivo externo, este archivo contiene los endpoints 
donde se va a hacer los cambios relacionados a los productos
Se importa mongoose, una biblioteca de Node.js para hacer cosas con las bases de datos de 
MongoDB
*/

const routerApi = require('./routes/rutas')
const mongoose  = require("mongoose");

/*
Se importa una función setupSwagger desde el swagger y la ejecuta, pasandola a la aplicación 
Express
*/
const setupSwagger = require('./swagger')
setupSwagger(app)

/*
Se habilita primero el uso de CORS en la aplicación
Se anade un middleware para analizar los JSON
Se configura el enrutador por donde se va a iniviar la aplicación donde se encontraran las 
operaciones get, post, put, delete de cada entidad
*/

app.use(cors())
app.use(bodyParser.json())
routerApi(app)

/*
Se conecta la aplicación con la base de datos de Mongo DB utilizando mongoose.conect
Se muestra un mensaje de texto en la consola si la conexión a MongoDB es exitosa
Se miestra un mensaje de error en caso de que la conexión falle, también los detalles del error
*/
mongoose.connect(
    'mongodb+srv://Cris_js:mondongoSick@mondongocluster.rb3ji.mongodb.net/?retryWrites=true&w=majority&appName=MondongoCluster'
)
.then(()=> console.log('Conexion Exitosa'))
.catch(err => console.error('No se pudo conectar pepepepepe',err))
//Se inicia el servidor de express y lo configura para que arranque desde el puerto 4000
app.listen(4000)