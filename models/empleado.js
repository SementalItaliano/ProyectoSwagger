//Se importa mongoose, una biblioteca para trabajar con bases de datos de Mongo DB en Node.js

const mongoose = require("mongoose")

const EmpleadoSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    Department1: {
        type: Object, 
        required: true
    },
    Department2: {
        type: Object, 
        required: true
    },
    Department3: {
        type: Object, 
        required: true
    }
})

module.exports =  mongoose.model('Empleado',EmpleadoSchema)