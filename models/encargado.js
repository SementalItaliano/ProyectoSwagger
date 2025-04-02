const mongoose = require('mongoose')

const encargadoSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre del producto es obligatorio"]
    },
    estudio: {
        type: String,
        required: [true, "La categoría es obligatoria"]
    },
    turno: {
        type: String,
        required: [true, "La marca es obligatoria"]
    }
}, { timestamps: true })

module.exports = mongoose.model("Encargado", encargadoSchema)