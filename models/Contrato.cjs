const mongoose = require('mongoose');

const ContratoSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    artista: { type: mongoose.Schema.Types.ObjectId, ref: 'Artista', required: true },
    fechaInicio: { type: Date, required: true },
    fechaFin: { type: Date, required: true },
    detalles: { type: String, required: true, trim: true },
    monto: { type: Number, required: true, trim: true},
    estado: { 
        type: String, 
        enum: ['Pendiente', 'Aceptado', 'Rechazado', 'Finalizado', 'Cancelado', 'En proceso de devolución'], 
        default: 'Pendiente' 
    },
    creado: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contrato', ContratoSchema);
