const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const setupSwagger = require('./Swagger')
const area = require('./routes/areas')
const departamento = require('./routes/departamentos')
const empleado = require('./routes/empleados')
const encargado = require('./routes/encargados')

const app = express()
const PORT = 4000

// Middleware
app.use(cors())
app.use(express.json())

// Rutas
app.use("/api/areas", area)
app.use("/api/departamentos", departamento)
app.use("/api/empleados", empleado)
app.use("/api/encargados", encargado)

// Configurar Swagger
setupSwagger(app)

// String de conexión a MongoDB
const mongoCHAVA = "mongodb+srv://abrahampapacaliente:mP3T7LYD0xp3dHQg@cluster1.locywsk.mongodb.net/"

mongoose.connect(mongoCHAVA)
    .then(() => console.log("Conexión exitosa a MongoDB"))
    .catch(err => console.error("No se pudo conectar a MongoDB", err))

// Inicio del servidor
app.listen(PORT, () => {
    console.log('Servidor corriendo.')
})
