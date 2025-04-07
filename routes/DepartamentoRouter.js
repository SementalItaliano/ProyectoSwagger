/*
Emportamos express para la creación de la api y creamos el enrutador para definir las rutas 
especificas, estas se agrupan en este archivo para la modularidad

*/
const express = require('express')
const router = express.Router()
/*
Se importan los modelos definido anteriormente para conectar las operaciones CRUD con la colección 

*/
const Empleado = require('../models/Empleado')
const area = require('../models/Area')
const encargado = require('../models/Encargado')
const Departamento = require('../models/Departamento')
// Se importa el servicio y se crea la instancia de este en una variable

const service = require('../services/service')
const departamento = new service(Departamento)

/*
Creamos este comentario donde asignamos que el siguiente enpoint va a ser incluido en el swagger, 
le damos primero la etiqueta a la que va a pertenecer, le damos la descripción y el contenido esperado 
que se va a recibir en ese endpoint
*/
/**
 * @swagger
 * /Departamento:
 *   get:
 *     tags:
 *       - departamento
 *     summary: Obtiene una lista de departamento
 *     responses:
 *       200:
 *         description: Lista de departamento
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
 *                   Encargado:
 *                     type: object
 *                   Area:
 *                     type: object
 */

// Se creará un endpoint para poder mostrar todos los registros o los datos creados en la entidad
router.get("/", (req, res) => {
  departamento.getALL(res)
})

/*
Creamos este comentario donde asignamos que el siguiente enpoint va a ser incluido en el swagger, 
le damos primero la etiqueta a la que va a pertenecer, le damos la descripción y el contenido esperado 
que se va a recibir en ese endpoint
*/
/**
 * @swagger
 * /departamento/{id}:
 *   get:
 *     tags:
 *       - departamento
 *     summary: Obtiene un departamento por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del departamento
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: departamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   _id:
 *                     type: number
*                   name:
 *                     type: string
 *                   Encargado:
 *                     type: object
 *                   Area:
 *                     type: object
 */

// Para el siguiente endpoint que realizaremos será el que se encargará de buscar algún elemento 
router.get("/:id", (req, res) => {
  departamento.getByid(req.params.id, res)
})

/*
Creamos este comentario donde asignamos que el siguiente enpoint va a ser incluido en el swagger, 
le damos primero la etiqueta a la que va a pertenecer, le damos la descripción y el contenido esperado 
que se va a recibir en ese endpoint
*/
/**
 * @swagger
 * /departamento:
 *   post:
 *     tags:
 *       - departamento
 *     summary: Crea un nuevo departamento
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
 *                   Encargado:
 *                     type: object
 *                   Area:
 *                     type: object
 *     responses:
 *       201:
 *         description: departamento creado
 */
/*
const deps = [
    {
      "_id": "dep001",
      "name": "Marketing",
      
      "Encargado": {
        "_id": "enc001",
        "name": "Kellie Parisian",
        "study": "Factors",
        "turn": "Matutino"
      },
      "Area": {
        "_id": "area004",
        "name": "Publicidad y Promoción",
        "built": 14
      }
    },
    {
      "_id": "dep002",
      "name": "Desarrollo de Producto",
      "Encargado": {
        "_id": "enc002",
        "name": "Dayana Mante",
        "study": "Usability",
        "turn": "Vespertino"
      },
      "Area": {
        "_id": "area004",
        "name": "Publicidad y Promoción",
        "built": 14
      }
    },
    {
      "_id": "dep003",
      "name": "Ventas",
      "Encargado": {
        "_id": "enc003",
        "name": "Chris Labadie",
        "study": "Optimization",
        "turn": "Matutino"
      },
      "Area": {
        "_id": "area008",
        "name": "Planificación Financiera",
        "built": 10
      }
    },
    {
      "_id": "dep004",
      "name": "Tecnología de la Información",
      "Encargado": {
        "_id": "enc004",
        "name": "Dustin Turcotte",
        "study": "Metrics",
        "turn": "Vespertino"
      },
      "Area": {
        "_id": "area006",
        "name": "Reclutamiento y Selección",
        "built": 11
      }
    },
    {
      "_id": "dep005",
      "name": "Logística",
      "Encargado": {
        "_id": "enc005",
        "name": "Elisha Strosin",
        "study": "Factors",
        "turn": "Matutino"
      },
      "Area": {
        "_id": "area002",
        "name": "Soporte Técnico",
        "built": 13
      }
    },
    {
      "_id": "dep006",
      "name": "Recursos Humanos",
      "Encargado": {
        "_id": "enc006",
        "name": "Darian Aufderhar",
        "study": "Accounts",
        "turn": "Matutino"
      },
      "Area": {
        "_id": "area005",
        "name": "Relaciones Públicas",
        "built": 5
      }
    },
    {
      "_id": "dep007",
      "name": "Finanzas",
      "Encargado": {
        "_id": "enc007",
        "name": "Arthur Graham",
        "study": "Quality",
        "turn": "Matutino"
      },
      "Area": {
        "_id": "area008",
        "name": "Planificación Financiera",
        "built": 10
      }
    },
    {
      "_id": "dep008",
      "name": "Atención al Cliente",
      "Encargado": {
        "_id": "enc008",
        "name": "Rosella Greenfelder",
        "study": "Operations",
        "turn": "Matutino"
      },
      "Area": {
        "_id": "area007",
        "name": "Análisis de Datos",
        "built": 12
      }
    },
    {
      "_id": "dep009",
      "name": "Producción",
      "Encargado": {
        "_id": "enc009",
        "name": "Loren Pfeffer",
        "study": "Communications",
        "turn": "Matutino"
      },
      "Area": {
        "_id": "area013",
        "name": "Producción",
        "built": 20
      }
    },
    {
      "_id": "dep010",
      "name": "Control de Calidad",
      "Encargado": {
        "_id": "enc010",
        "name": "Ocie Barton",
        "study": "Research",
        "turn": "Vespertino"
      },
      "Area": {
        "_id": "area015",
        "name": "Control de Calidad",
        "built": 18
      }
    }
  ]
  
router.post("/", async (req, res) => {
  try {
      const promises = deps.map(product => {
          const Dpartamento = new Departamento({
              name: product.name,
              Encargado: product.Encargado,
              Area: product.Area
          });
          return Dpartamento.save();
      });

      // Espera a que todas las promesas se resuelvan
      const results = await Promise.all(promises);
      res.json(results); // Responde con los datos guardados
  } catch (e) {
      res.status(500).json({ message: e.message }); // Manejo de errores
  }
})
*/

//Se crea un endpoint que recibe los valores que se requieren para crear un nuevo registro
router.post("/", async (req, res) => {
  // se reciben solo los valores que se requieren y se ignora cualquier otro valor
  const body = {
    name: req.body.name,
    Encargado: req.body.Encargado,
    Area: req.body.Area
  }
  //  se confirma que los valores que se tomaron sean diferentes de Unndefined
  if (body.name == undefined || body.Encargado == undefined || body.Area == undefined) {
    return res.status(400).json({
      message: 'Faltan campos requeridos.'
    });
  } else {
// Se manda a llamar el servicio remplace que recibe el body y una referencia a la base de datos donde buscara el id del body en esa lista 
// si esta el id en la lista lo reemplaza en el body y si no lo encuentra regresa un -1
    body.Encargado = await departamento.remplace(body.Encargado, encargado)
    body.Area = await departamento.remplace(body.Area, area);

    //verifica que los campos sean validos
    if (body.Encargado == -1 && body.Area == -1) {
      return res.status(400).json({
        message: 'Campo area y encargado Invalido.'
      });
    } else if (body.Encargado == -1) {
      return res.status(400).json({
        message: 'Campo encargado Invalido.'
      });
    } else if (body.Area == -1) {
      return res.status(400).json({
        message: 'Campo area Invalido.'
      });
    }

  //  Se llama al servicio post que crea un nuevo registro dandole los campos del body y el res
    departamento.post(body, res)
  }
})

/*
Creamos este comentario donde asignamos que el siguiente enpoint va a ser incluido en el swagger, 
le damos primero la etiqueta a la que va a pertenecer, le damos la descripción y el contenido esperado 
que se va a recibir en ese endpoint
*/
/**
 * @swagger
 * /departamento/{id}:
 *   patch:
 *     tags:
 *       - departamento
 *     summary: Actualiza un departamento por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del departamento
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
 *                   Encargado:
 *                     type: object
 *                   Area:
 *                     type: object
 *     responses:
 *       200:
 *         description: departamento actualizado
 */
//Primero, se obtiene id de la URL y body de req.body, filtrado para incluir solo campos válidos. 

router.patch('/:id', async (req, res) => {
      //  se toma el id 
    // se reciben solo los valores que se requieren y se ignora cualquier otro valor

  const body = {
    name: req.body.name,
    Encargado: req.body.Encargado,
    Area: req.body.Area
  }

  if (body.Encargado != undefined) {
// Se manda a llamar el servicio remplace que recibe el body y una referencia a la base de datos donde buscara el id del body en esa lista 
// si esta el id en la lista lo reemplaza en el body y si no lo encuentra regresa un -1
body.Encargado = await departamento.remplace(body.Encargado, encargado)
    if (body.Encargado == -1) {
      // Se verifica que sea valido y si no, se manda un mensaje
      return res.status(400).json({
        message: 'Campo Encargado Invalido. Cambios no realizados'
      });
    }
  }

  if (body.Area != undefined) {
      //  Se llama al servicio post que crea un nuevo registro dandole los campos del boy y el null significa que se va a hacer un id automatico
    body.Area = await departamento.remplace(body.Area, area);
    if (body.Area == -1) {
      // Se verifica que sea valido y si no, se manda un mensaje

      return res.status(400).json({
        message: 'Campo area Invalido. Cambios no realizados'
      });
    }
  }

  //  Se llama al servicio update que modifica el registro dandole los campos del body, id y res

  departamento.update(req.params.id, body, res)
})

/*
Creamos este comentario donde asignamos que el siguiente enpoint va a ser incluido en el swagger, 
le damos primero la etiqueta a la que va a pertenecer, le damos la descripción y el contenido esperado 
que se va a recibir en ese endpoint
*/
/**
 * @swagger
 * /departamento/{id}:
 *   delete:
 *     tags:
 *       - departamento
 *     summary: Elimina un departamento por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Produc`  to
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: departamento eliminado
 */
//Aquí, id se extrae de la URL y borra el producto

router.delete("/:id", (req, res) => {
   //  Se verifica que no se este usando antes de que se quiera eliminar y en el mismo servicio se elimina el area si no se esta usando en ningun departamento
  departamento.find(Empleado, req.params.id, "Departamento", res)
})

module.exports = router