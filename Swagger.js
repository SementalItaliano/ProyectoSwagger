const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Gestión de Empresa",
            version: "1.0.0",
            description: "Documentación de la API para gestionar empleados, departamentos, encargados y áreas.",
        },
        servers: [
            {
                url: "http://localhost:4000",
            },
        ],
        components: {
            schemas: {
                // Esquema para el modelo Area
                Area: {
                    type: "object",
                    properties: {
                        name: { type: "string", description: "Nombre del área" },
                        edificio: { type: "string", description: "Nombre del edificio" },
                    },
                    required: ["name", "edificio"]
                },
                // Esquema para el modelo Departamento
                Departamento: {
                    type: "object",
                    properties: {
                        name: { type: "string", description: "Nombre del departamento" },
                        area: {type: "string", description: "ID del area del departamento"},
                        encargado: {type: "string", description: "ID del encargado del departamento"},
                    },
                    required: ["name", "area", "encargado"]
                },
                // Esquema para el modelo Empleado
                Empleado: {
                    type: "object",
                    properties: {
                        name: { type: "string", description: "Nombre del empleado" },
                        apellido: { type: "string", description: "Apellido del empleado" },
                        edad: { type: "integer", description: "Edad del empleado" },
                        genero: { type: "string", description: "Género del empleado" },
                        departamentos: {type: "string", description: "ID de los departamentos del empelado"},
                    },
                    required: ["name", "apellido", "edad", "genero", "departamentos"]
                },
                // Esquema para el modelo Encargado
                Encargado: {
                    type: "object",
                    properties: {
                        name: { type: "string", description: "Nombre del encargado" },
                        estudio: { type: "string", description: "Estudios del encargado" },
                        turno: { type: "string", description: "Turno del encargado" },
                    },
                    required: ["name", "estudio", "turno"]
                }
            }
        }
    },
    apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
    app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
