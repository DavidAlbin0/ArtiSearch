const mongoose = require('mongoose');

const ArtistaSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    apellidoP: { type: String, required: true, trim: true },
    apellidoM: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    telefono: { type: Number, required: true, unique: true },
    ubicacion: { type: String, trim: true }, // Ejemplo: "CDMX, México"
    descripcion: { type: String, trim: true }, // Breve descripción del artista
    especialidad: { type: String, trim: true }, // Ejemplo: "Pintura, Escultura"
    genero:  { type: String, trim: true},
    creado: { type: Date, default: Date.now },
    password: { type: String, required: true, trim: true },
});

module.exports = mongoose.model('Artista', ArtistaSchema);
