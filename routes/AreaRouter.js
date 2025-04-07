/*
Emportamos express para la creación de la api y creamos el enrutador para definir las rutas 
especificas, estas se agrupan en este archivo para la modularidad

*/
const express = require('express')
const router = express.Router()

/*
Se importan los modelos definido anteriormente para conectar las operaciones CRUD con la colección 

*/
const area = require('../models/Area')
const Departamento = require('../models/Departamento')

// Se importa el servicio y se crea la instancia de este en una variable
const service = require('../services/service')
const Area = new service(area)

/*
Creamos este comentario donde asignamos que el siguiente enpoint va a ser incluido en el swagger, 
le damos primero la etiqueta a la que va a pertenecer, le damos la descripción y el contenido esperado 
que se va a recibir en ese endpoint
*/
/**
 * @swagger
 * /Area:
 *   get:
 *     tags:
 *       - Area
 *     summary: Obtiene una lista de Area
 *     responses:
 *       200:
 *         description: Lista de Area
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: number
 *                   name: 
 *                     type: string
 *                   built: 
 *                      type: string
 */
// Se creará un endpoint para poder mostrar todos los registros o los datos creados en la entidad
router.get("/", (req, res) => {
  Area.getALL(res)
})

/*
Creamos este comentario donde asignamos que el siguiente enpoint va a ser incluido en el swagger, 
le damos primero la etiqueta a la que va a pertenecer, le damos la descripción y el contenido esperado 
que se va a recibir en ese endpoint
*/
/**
 * @swagger
 * /Area/{id}:
 *   get:
 *     tags:
 *       - Area
 *     summary: Obtiene un area por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del area
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: area encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   _id:
 *                     type: number
 *                   name: 
 *                     type: string
 *                   built: 
 *                      type: string
 */
// Para el siguiente endpoint que realizaremos será el que se encargará de buscar algún elemento 
router.get("/:id", (req, res) => {
  Area.getByid(req.params.id, res)
})
/*
buscándolo por medio de su id en el mismo URL
Creamos este comentario donde asignamos que el siguiente enpoint va a ser incluido en el swagger, 
le damos primero la etiqueta a la que va a pertenecer, le damos la descripción y el contenido esperado 
que se va a recibir en ese endpoint
*/
/**
 * @swagger
 * /Area:
 *   post:
 *     tags:
 *       - Area
 *     summary: Crea un nuevo area
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                   _id:
 *                     type: number
 *                   name: 
 *                     type: string
 *                   built: 
 *                      type: number
 *     responses:
 *       201:
 *         description: area creado
 */
/*
const areas = [
  { "_id": "area001", "name": "Gestión de Nómina", "built": 7 },
  { "_id": "area002", "name": "Soporte Técnico", "built": 13 },
  { "_id": "area003", "name": "Mantenimiento", "built": 9 },
  { "_id": "area004", "name": "Publicidad y Promoción", "built": 14 },
  { "_id": "area005", "name": "Relaciones Públicas", "built": 5 },
  { "_id": "area006", "name": "Reclutamiento y Selección", "built": 11 },
  { "_id": "area007", "name": "Análisis de Datos", "built": 12 },
  { "_id": "area008", "name": "Planificación Financiera", "built": 10 },
  { "_id": "area009", "name": "Seguridad y Riesgos", "built": 6 },
  { "_id": "area010", "name": "Investigación de Mercado", "built": 8 },
  { "_id": "area011", "name": "Desarrollo de Software", "built": 15 },
  { "_id": "area012", "name": "Consultoría Estratégica", "built": 9 },
  { "_id": "area013", "name": "Producción", "built": 20 },
  { "_id": "area014", "name": "Logística", "built": 13 },
  { "_id": "area015", "name": "Control de Calidad", "built": 18 }
]
router.post("/", async (req, res) => {
  try {
    const promises = areas.map(product => {
        const book = new area({
            name: product.name,
            built: product.built
        });
        return book.save();
    });
 
      // Espera a que todas las promesas se resuelvan
      const results = await Promise.all(promises);
      res.json(results); // Responde con los datos guardados
  } catch (e) {
      res.status(500).json({ message: e.message }); // Manejo de errores
  }
});
*/
//Se crea un endpoint que recibe los valores que se requieren para crear un nuevo registro

router.post("/", (req, res) => {
      // se reciben solo los valores que se requieren y se ignora cualquier otro valor
  const body = {
    name: req.body.name,
    built: req.body.built
  }
    //  se confirma que los valores que se tomaron sean diferentes de Unndefined
  if (body.name == undefined || body.built == undefined) {
    return res.status(400).json({
      message: 'Faltan campos requeridos.'
    });
  } else {
  //  Se llama al servicio post que crea un nuevo registro dandole los campos del body y el res
    Area.post(body, res)
  }
})
/*
Creamos este comentario donde asignamos que el siguiente enpoint va a ser incluido en el swagger, 
le damos primero la etiqueta a la que va a pertenecer, le damos la descripción y el contenido esperado 
que se va a recibir en ese endpoint
*/
/**
 * @swagger
 * /Area/{id}:
 *   patch:
 *     tags:
 *       - Area
 *     summary: Actualiza un area por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del area
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                   _id:
 *                     type: number
 *                   name: 
 *                     type: string
 *                   built: 
 *                      type: number
 *     responses:
 *       200:
 *         description: area actualizado
 */
//Primero, se obtiene id de la URL y body de req.body, filtrado para incluir solo campos válidos. 
router.patch('/:id', (req, res) => {
      //  se toma el id 
    // se reciben solo los valores que se requieren y se ignora cualquier otro valor

  const body = {
    name: req.body.name,
    built: req.body.built
  }
  //  Se llama al servicio post que crea un nuevo registro dandole los campos del boy y el null significa que se va a hacer un id automatico

  Area.update(req.params.id, body, res)
})
/*
Creamos este comentario donde asignamos que el siguiente enpoint va a ser incluido en el swagger, 
le damos primero la etiqueta a la que va a pertenecer, le damos la descripción y el contenido esperado 
que se va a recibir en ese endpoint
*/
/**
 * @swagger
 * /Area/{id}:
 *   delete:
 *     tags:
 *       - Area
 *     summary: Elimina un area por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del area
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: area eliminado
 */
//Aquí, id se extrae de la URL y borra el producto
router.delete("/:id", (req, res) => {
  //  Se verifica que no se este usando antes de que se quiera eliminar y en el mismo servicio se elimina el area si no se esta usando en ningun departamento
  Area.find(Departamento, req.params.id, "Area", res)
})
module.exports = router