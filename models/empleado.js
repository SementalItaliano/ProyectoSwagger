const mongoose = require('mongoose');

const empleadoSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre del empleado es obligatorio"]
    },
    apellido: {
        type: String,
        required: [true, "El apellido del empleado es obligatorio"]
    },
    edad: {
        type: Number,
        required: [true, "La edad es obligatoria"]
    },
    genero: {
        type: String,
        required: [true, "El género es obligatorio"]
    },
    departamentos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Departamento",
            required: true
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Empleado", empleadoSchema);
