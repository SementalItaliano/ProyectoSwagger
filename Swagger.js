/*
Lo primero que haremos será importar las librerías necesarias para piner Swagger en nuestro 
proyecto
Swagger-jsdoc nos genera un archivo de especificacione de Swagger en formato Json
Swagger-ui-express nos proporciona la interfaz de usuario para el navegador y visualizar y probar la 
api
*/
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
/*
En esta parte se define la especificación que va a tener el Swagger
Primero le indicamos la versión de openApi
Le indicamos toda la informacon relevante que necesitamos que contenga como el titulo, la versión y 
la descripcion de la Api
Luego le pasamos la información necesaria para que la api arranque en el servidor locar con su URL
*/
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title:'Api"s Documentacion',
    version:'1.0.0',
    description:'Api"s Documentacion with swagger'
  },
  servers:[
    {
      url:'http://localhost:4000',
      description:'Develop"s server'
    }
  ]
}
/*
En opciones se configura primero la información que acabamos de crear
Despues le especificamos la ubicación de los archivos donde están definidas las rutas(En este caso 
la carpeta routes) Donde Swagger leerá los comentarios de estos archivos buscando la notación 
@swagger
*/
const options ={
  swaggerDefinition,
  apis:['./routes/*.js']
}

/*
Genera la especificación Swagger donde swaggerJSDoc procesa las opciones 
configuradas y nos da un Json que describe la api 
*/

const swaggerSpect = swaggerJSDoc(options)

/*
Lo primero que realiza esta función es integrar swagger en la aplicación con Express
Se define una nueva ruta con app.use y le pasamos primero /api-docs 
despues pasar como parámetro el swagger.UI.serve que es un middleware que entrega los archivos 
estáticos necesarios para la interfaz
incluimos el siguiente parámetro que genera y configura la interfaz de Swagger basada en la 
especificación del Swagger
*/

function setupSwagger(app){
  app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpect))
}

//Exporta únicamente la función setupSwagger del archivo para que desde el archivo app.js se pueda utilizar

module.exports= setupSwagger
