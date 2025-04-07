/*
Emportamos express para la creación de la api y creamos el enrutador para definir las rutas 
especificas, estas se agrupan en este archivo para la modularidad

*/
const express = require('express')
const router = express.Router()
/*
Se importan los modelos definido anteriormente para conectar las operaciones CRUD con la colección 

*/
const Departamento = require('../models/Departamento')
const encargado = require('../models/Encargado')

// Se importa el servicio y se crea la instancia de este en una variable
const service = require('../services/service')
const Encargado = new service(encargado)

/*
Creamos este comentario donde asignamos que el siguiente enpoint va a ser incluido en el swagger, 
le damos primero la etiqueta a la que va a pertenecer, le damos la descripción y el contenido esperado 
que se va a recibir en ese endpoint
*/

/**
 * @swagger
 * /Encargado:
 *   get:
 *     tags:
 *       - Encargado
 *     summary: Obtiene una lista de Encargado
 *     responses:
 *       200:
 *         description: Lista de Encargado
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
 *                   study:
 *                     type: string
 *                   turn:
 *                     type: string
 */

// Se creará un endpoint para poder mostrar todos los registros o los datos creados en la entidad
router.get("/", (req, res) => {
  Encargado.getALL(res)
})

/*
Creamos este comentario donde asignamos que el siguiente enpoint va a ser incluido en el swagger, 
le damos primero la etiqueta a la que va a pertenecer, le damos la descripción y el contenido esperado 
que se va a recibir en ese endpoint
*/
/**
 * @swagger
 * /Encargado/{id}:
 *   get:
 *     tags:
 *       - Encargado
 *     summary: Obtiene un encargado por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del encargado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: encargado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   _id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   study:
 *                     type: string
 *                   turn:
 *                     type: string
 */
// Para el siguiente endpoint que realizaremos será el que se encargará de buscar algún elemento 

router.get("/:id", (req, res) => {
  Encargado.getByid(req.params.id, res)
})
/*
Creamos este comentario donde asignamos que el siguiente enpoint va a ser incluido en el swagger, 
le damos primero la etiqueta a la que va a pertenecer, le damos la descripción y el contenido esperado 
que se va a recibir en ese endpoint
*/

/**
 * @swagger
 * /Encargado:
 *   post:
 *     tags:
 *       - Encargado
 *     summary: Crea un nuevo encargado
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
 *                   study:
 *                     type: string
 *                   turn:
 *                     type: string
 *     responses:
 *       201:
 *         description: encargado creado
 */
/*
const managers = [
  { "_id": "enc001", "name": "Kellie Parisian", "study": "Factors", "turn": "Matutino" },
  { "_id": "enc002", "name": "Dayana Mante", "study": "Usability", "turn": "Vespertino" },
  { "_id": "enc003", "name": "Chris Labadie", "study": "Optimization", "turn": "Matutino" },
  { "_id": "enc004", "name": "Dustin Turcotte", "study": "Metrics", "turn": "Vespertino" },
  { "_id": "enc005", "name": "Elisha Strosin", "study": "Factors", "turn": "Matutino" },
  { "_id": "enc006", "name": "Darian Aufderhar", "study": "Accounts", "turn": "Matutino" },
  { "_id": "enc007", "name": "Arthur Graham", "study": "Quality", "turn": "Matutino" },
  { "_id": "enc008", "name": "Rosella Greenfelder", "study": "Operations", "turn": "Matutino" },
  { "_id": "enc009", "name": "Loren Pfeffer", "study": "Communications", "turn": "Matutino" },
  { "_id": "enc010", "name": "Ocie Barton", "study": "Research", "turn": "Vespertino" },
  { "_id": "enc011", "name": "Obie Leuschke", "study": "Implementation", "turn": "Matutino" },
  { "_id": "enc012", "name": "Gage Lakin", "study": "Security", "turn": "Vespertino" },
  { "_id": "enc013", "name": "Asia Powlowski", "study": "Division", "turn": "Vespertino" },
  { "_id": "enc014", "name": "Christiana Ullrich", "study": "Branding", "turn": "Vespertino" },
  { "_id": "enc015", "name": "Annabel Lueilwitz", "study": "Branding", "turn": "Matutino" }
]

router.post("/", async (req, res) => {
  try {
      const promises = managers.map(product => {
          const Eencargado = new encargado({
              name: product.name,
              study: product.study,
              turn: product.turn
          });
          return Eencargado.save();
      });

      // Espera a que todas las promesas se resuelvan
      const results = await Promise.all(promises);
      res.json(results); // Responde con los datos guardados
  } catch (e) {
      res.status(500).json({ message: e.message }); // Manejo de errores
  }
})*/
//Se crea un endpoint que recibe los valores que se requieren para crear un nuevo registro

router.post("/", (req, res) => {
        // se reciben solo los valores que se requieren y se ignora cualquier otro valor

  const body = {
    name: req.body.name,
    study: req.body.study,
    turn: req.body.turn
  }
      //  se confirma que los valores que se tomaron sean diferentes de Unndefined

  if (body.name == undefined || body.study == undefined || body.turn == undefined) {
    return res.status(400).json({
      message: 'Faltan campos requeridos.'
    });
  } else {
      //  Se llama al servicio post que crea un nuevo registro dandole los campos del body y el res

    Encargado.post(body, res)
  }
})
/*
Creamos este comentario donde asignamos que el siguiente enpoint va a ser incluido en el swagger, 
le damos primero la etiqueta a la que va a pertenecer, le damos la descripción y el contenido esperado 
que se va a recibir en ese endpoint
*/

/**
 * @swagger
 * /Encargado/{id}:
 *   patch:
 *     tags:
 *       - Encargado
 *     summary: Actualiza un encargado por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del encargado
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
 *                   study:
 *                     type: string
 *                   turn:
 *                     type: string
 *     responses:
 *       200:
 *         description: encargado actualizado
 */
//Primero, se obtiene id de la URL y body de req.body, filtrado para incluir solo campos válidos. 

router.patch('/:id', (req, res) => {
    //  se toma el id 
    // se reciben solo los valores que se requieren y se ignora cualquier otro valor

  const body = {
    name: req.body.name,
    study: req.body.study,
    turn: req.body.turn
  }
  //  Se llama al servicio post que crea un nuevo registro dandole los campos del boy y el null significa que se va a hacer un id automatico

  Encargado.update(req.params.id, body, res)
})

/*
Creamos este comentario donde asignamos que el siguiente enpoint va a ser incluido en el swagger, 
le damos primero la etiqueta a la que va a pertenecer, le damos la descripción y el contenido esperado 
que se va a recibir en ese endpoint
*/

/**
 * @swagger
 * /Encargado/{id}:
 *   delete:
 *     tags:
 *       - Encargado
 *     summary: Elimina un encargado por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del encargado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: encargado eliminado
 */
//Aquí, id se extrae de la URL y borra el producto

router.delete("/:id", (req, res) => {
    //  Se verifica que no se este usando antes de que se quiera eliminar y en el mismo servicio se elimina el area si no se esta usando en ningun departamento

  Encargado.find(Departamento, req.params.id, "Encargado", res)
})

module.exports = router