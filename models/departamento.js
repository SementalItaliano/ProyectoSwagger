const mongoose = require('mongoose');

const departamentoSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre del departamento es obligatorio"]
    },
    area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Area",
        required: true
    },
    encargado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Encargado",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Departamento", departamentoSchema);
