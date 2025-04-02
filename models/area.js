const mongoose = require('mongoose');

const areaSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre del area es obligatorio"]
    },
    edificio: {
        type: String,
        required: [true, "El edificio es obligatorio"]
    }
}, { timestamps: true });

module.exports = mongoose.model("Area", areaSchema); 
