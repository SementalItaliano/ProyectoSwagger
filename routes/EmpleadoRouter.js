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
const Departamento = require('../models/Departamento')

// Se importa el servicio y se crea la instancia de este en una variable

const service = require('../services/service')
const empleado = new service(Empleado)

/*
Creamos este comentario donde asignamos que el siguiente enpoint va a ser incluido en el swagger, 
le damos primero la etiqueta a la que va a pertenecer, le damos la descripción y el contenido esperado 
que se va a recibir en ese endpoint
*/
/**
 * @swagger
 * /Empleado:
 *   get:
 *     tags:
 *       - empleado
 *     summary: Obtiene una lista de empleado
 *     responses:
 *       200:
 *         description: Lista de empleado
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
 *                   lastName:
 *                     type: string
 *                   age:
 *                     type: number
 *                   gender:
 *                     type: number
 *                   Department1:
 *                     type: string
 *                   Department2:
 *                     type: object
 *                   Department3:
 *                     type: object
 */
// Se creará un endpoint para poder mostrar todos los registros o los datos creados en la entidad

router.get("/", (req, res) => {
  empleado.getALL(res)
})

/*
Creamos este comentario donde asignamos que el siguiente enpoint va a ser incluido en el swagger, 
le damos primero la etiqueta a la que va a pertenecer, le damos la descripción y el contenido esperado 
que se va a recibir en ese endpoint
*/
/**
 * @swagger
 * /Empleado/{id}:
 *   get:
 *     tags:
 *       - empleado
 *     summary: Obtiene un empleado por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: empleado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   _id:
 *                     type: number
*                   name:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   age:
 *                     type: number
 *                   gender:
 *                     type: number
 *                   Department1:
 *                     type: object
 *                   Department2:
 *                     type: object
 *                   Department3:
 *                     type: object
 */
// Para el siguiente endpoint que realizaremos será el que se encargará de buscar algún elemento 

router.get("/:id", (req, res) => {
  empleado.getByid(req.params.id, res)
})

/*
Creamos este comentario donde asignamos que el siguiente enpoint va a ser incluido en el swagger, 
le damos primero la etiqueta a la que va a pertenecer, le damos la descripción y el contenido esperado 
que se va a recibir en ese endpoint
*/
/**
 * @swagger
 * /Empleado:
 *   post:
 *     tags:
 *       - empleado
 *     summary: Crea un nuevo empleado
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
 *                   lastName:
 *                     type: string
 *                   age:
 *                     type: number
 *                   gender:
 *                     type: number
 *                   Department1:
 *                     type: object
 *                   Department2:
 *                     type: object
 *                   Department3:
 *                     type: object
 *     responses:
 *       201:
 *         description: empleado creado
 */
/*

const employee = [
  {
    "_id": "emp001",
    "name": "Forrest Witting III",
    "lastName": "Frami",
    "age": 25,
    "gender": "Male",
    "Department1": {
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
    "Department2": {
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
    "Department3": {
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
    }
  },
  {
    "_id": "emp002",
    "name": "Amber Morar",
    "lastName": "Kautzer",
    "age": 26,
    "gender": "Female",
    "Department1": {
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
    "Department2": {
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
    "Department3": {
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
    }
  },
  {
    "_id": "emp003",
    "name": "Roberta Denesik II",
    "lastName": "Steuber",
    "age": 18,
    "gender": "Male",
    "Department1": {
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
    "Department2": {
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
    "Department3": {
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
    }
  },
  {
    "_id": "emp004",
    "name": "Asia Powlowski",
    "lastName": "Lesch",
    "age": 22,
    "gender": "Female",
    "Department1": {
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
    },
    "Department2": {
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
    "Department3": {
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
    }
  },
  {
    "_id": "emp005",
    "name": "Gage Lakin",
    "lastName": "Schuster",
    "age": 30,
    "gender": "Male",
    "Department1": {
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
    "Department2": {
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
    "Department3": {
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
    }
  }
]

router.post("/", async (req, res) => {
  try {
      const promises = employee.map(product => {
          const empleadoo = new Empleado({
              name: product.name,
              lastName: product.lastName,
              age: product.age,
              gender: product.gender,
              Department1: product.Department1,
              Department2: product.Department2,
              Department3: product.Department3
          });
          return empleadoo.save();
      });

      // Espera a que todas las promesas se resuelvan
      const results = await Promise.all(promises);
      res.json(results); // Responde con los datos guardados
  } catch (e) {
      res.status(500).json({ message: e.message }); // Manejo de errores
  }
});*/
//Se crea un endpoint que recibe los valores que se requieren para crear un nuevo registro

router.post("/", async (req, res) => {
    // se reciben solo los valores que se requieren y se ignora cualquier otro valor
  const body = {
    name: req.body.name,
    lastName: req.body.lastName,
    age: req.body.age,
    gender: req.body.gender,
    Department1: req.body.Department1,
    Department2: req.body.Department2,
    Department3: req.body.Department3
  }
    //  se confirma que los valores que se tomaron sean diferentes de Unndefined
  if (body.name == undefined || body.lastName == undefined || body.age == undefined || body.gender == undefined || body.Department1 == undefined || body.Department2 == undefined || body.Department3 == undefined) {
    return res.status(400).json({
      message: 'Faltan campos requeridos.'
    });
  } else {

// Se manda a llamar el servicio remplace que recibe el body y una referencia a la base de datos donde buscara el id del body en esa lista 
// si esta el id en la lista lo reemplaza en el body y si no lo encuentra regresa un -1
    body.Department1 = await empleado.remplace(body.Department1, Departamento)
    body.Department2 = await empleado.remplace(body.Department2, Departamento)
    body.Department3 = await empleado.remplace(body.Department3, Departamento)

        //verifica que los campos sean validos

    if (body.Department1 == -1 && body.Department2 == -1 && body.Department3 == -1) {
      return res.status(400).json({
        message: 'Campo los 3 departamentos son invalidos Invalidos.'
      });
    } else if (body.epartment1 == -1 && body.Department2 == -1) {
      return res.status(400).json({
        message: 'Campo departamento 1 y 2 Invalidos.'
      });
    } else if (body.Department1 == -1 && body.Department3 == -1) {
      return res.status(400).json({
        message: 'Campo departamento 1 y 3 Invalidos.'
      });
    } else if (body.Department2 == -1 && body.Department3 == -1) {
      return res.status(400).json({
        message: 'Campo departamento 2 y 3 Invalidos.'
      });
    } else if (body.Department1 == -1) {
      return res.status(400).json({
        message: 'Campo departamento 1 Invalido.'
      });
    } else if (body.Department2 == -1) {
      return res.status(400).json({
        message: 'Campo departamento 2 Invalido.'
      });
    } else if (body.Department3 == -1) {
      return res.status(400).json({
        message: 'Campo departamento 3 Invalido.'
      });
    } else if (body.Department1 == body.Department2 || body.Department2 == body.Department3 || body.Department1 == body.Department3) {
      return res.status(400).json({
        message: 'hay departamentos repetidos.'
      });
    }

  //  Se llama al servicio post que crea un nuevo registro dandole los campos del body y el res

    empleado.post(body, res)
  }
})

/*
Creamos este comentario donde asignamos que el siguiente enpoint va a ser incluido en el swagger, 
le damos primero la etiqueta a la que va a pertenecer, le damos la descripción y el contenido esperado 
que se va a recibir en ese endpoint
*/
/**
 * @swagger
 * /Empleado/{id}:
 *   patch:
 *     tags:
 *       - empleado
 *     summary: Actualiza un empleado por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado
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
 *                   lastName:
 *                     type: string
 *                   age:
 *                     type: number
 *                   gender:
 *                     type: number
 *                   Department1:
 *                     type: object
 *                   Department2:
 *                     type: object
 *                   Department3:
 *                     type: object
 *     responses:
 *       200:
 *         description: empleado actualizado
 */
//Primero, se obtiene id de la URL y body de req.body, filtrado para incluir solo campos válidos. 

router.patch('/:id', async (req, res) => {
      //  se toma el id 
    // se reciben solo los valores que se requieren y se ignora cualquier otro valor

  const body = {
    name: req.body.name,
    lastName: req.body.lastName,
    age: req.body.age,
    gender: req.body.gender,
    Department1: req.body.Department1,
    Department2: req.body.Department2,
    Department3: req.body.Department3
  }

  if (body.Department1 != undefined) {
// Se manda a llamar el servicio remplace que recibe el body y una referencia a la base de datos donde buscara el id del body en esa lista 
// si esta el id en la lista lo reemplaza en el body y si no lo encuentra regresa un -1

    body.Department1 = await empleado.remplace(body.Department1, Departamento)

    if (body.Department1 == -1) {
            // Se verifica que sea valido y si no, se manda un mensaje

      return res.status(400).json({
        message: 'Campo departamento 1 Invalido.'
      });
    }
  }

  if (body.Department2 != undefined) {
// Se manda a llamar el servicio remplace que recibe el body y una referencia a la base de datos donde buscara el id del body en esa lista 
// si esta el id en la lista lo reemplaza en el body y si no lo encuentra regresa un -1

    body.Department2 = await empleado.remplace(body.Department2, Departamento)

    if (body.Department2 == -1) {
            // Se verifica que sea valido y si no, se manda un mensaje

      return res.status(400).json({
        message: 'Campo departamento 2 Invalido.'
      });
    }
  }

  if (body.Department3 != undefined) {
// Se manda a llamar el servicio remplace que recibe el body y una referencia a la base de datos donde buscara el id del body en esa lista 
// si esta el id en la lista lo reemplaza en el body y si no lo encuentra regresa un -1

    body.Department3 = await empleado.remplace(body.Department3, Departamento)

    if (body.Department3 == -1) {
            // Se verifica que sea valido y si no, se manda un mensaje

      return res.status(400).json({
        message: 'Campo departamento 3 Invalido.'
      });
    }
  }

// Se utilizan estos if vacios para filtrar cuando no den dos departamentos y separarlos de indefinido
  if (body.Department1 == undefined && body.Department2 == undefined) {

  } else if (body.Department1 == undefined && body.Department3 == undefined) {

  } else if (body.Department2 == undefined && body.Department3 == undefined) {

  } else // estos if captan cuando no se da un departamento y veririfa que los demas departamentos no esten duplicados
  if (body.Department1 != undefined) {
    // Se verifica que cuando no se modifique el departamento uno los demas no se repitan
    if (body.Department2 == body.Department3) {
      return res.status(400).json({
        message: 'departamentos 1 y 3 repetidos.'
      });
    }
  }
  else if (body.Department2 != undefined) {
        // Se verifica que cuando no se modifique el departamento dos los demas no se repitan

    if (body.Department1 == body.Department3) {
      return res.status(400).json({
        message: 'departamentos 1 y 3 repetidos.'
      });
    }
  }
  else if (body.Department3 != undefined) {
        // Se verifica que cuando no se modifique el departamento tres los demas no se repitan

    if (body.Department2 == body.Department1) {
      return res.status(400).json({
        message: 'departamentos 2 y 1 repetidos.'
      });
    }
  }

  empleado.update(req.params.id, body, res)
})

/*
Creamos este comentario donde asignamos que el siguiente enpoint va a ser incluido en el swagger, 
le damos primero la etiqueta a la que va a pertenecer, le damos la descripción y el contenido esperado 
que se va a recibir en ese endpoint
*/
/**
 * @swagger
 * /Empleado/{id}:
 *   delete:
 *     tags:
 *       - empleado
 *     summary: Elimina un empleado por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: empleado eliminado
 */
router.delete("/:id", (req, res) => {
  empleado.delete(req.params.id, res)
})

module.exports = router