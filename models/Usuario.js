const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    
    idUsuario: {
        type:Number,
        require: true,
        trim: true,
        unique: true
    },
    nombre: {
        type:String,
        require: true,
        trim: true
    },
    apellidoP: {
        type:String,
        require: true,
        trim: true
    },
    apellidoM: {
        type:String,
        require: true,
        trim: true
    },
    email: {
        type:String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type:String,
        require: true,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now
    },
    tipoUser: {
        type:Number,
        require: true,
        trim: true
    },
    telefono: {
        type: Number,
        require: true,
        trim: true,
        unique: true
    }
});

module.exports = mongoose.model('usuario, UsuarioSchema')