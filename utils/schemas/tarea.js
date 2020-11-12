const joi = require('@hapi/joi');

const tareaAntecesoraSchema = joi.object().keys({
    idTareaAntecesora: joi.number().required(),
    diasAntecesora: joi.number().min(0).max(365).required(),
    horasAntecesora: joi.number().min(0).max(60).required(),
    minutosAntecesora: joi.number().min(0).max(60).required()
});

const nombreTareaSchema = joi.string().trim().max(100);
const observacionesTareaSchema = joi.string().max(255).allow('');
const procesoTareaSchema = {
    idProceso: joi.number().required(),
    tareaAntecesora: tareaAntecesoraSchema
}

const crearTareaSchema = {
    nombre: nombreTareaSchema.required(),
    observaciones: observacionesTareaSchema,
    proceso: procesoTareaSchema
}

const actualizarTareaSchema = {
    nombre: nombreTareaSchema,
    observaciones: observacionesTareaSchema,
    proceso: procesoTareaSchema
}

module.exports = {
    crearTareaSchema,
    actualizarTareaSchema
}
