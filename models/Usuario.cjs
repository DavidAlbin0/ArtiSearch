const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellidoP: {
        type: String,
        required: true,
        trim: true
    },
    apellidoM: {
        type: String,
        required: true,
        trim: true
    },
    genero: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now
    },
    tipoUser: {
        type: Number,
        required: true,
        trim: true
    },
    telefono: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    ubicacion: { 
        type: String,
        trim: true 
    }, 

});

module.exports = mongoose.model('Usuario', UsuarioSchema);
