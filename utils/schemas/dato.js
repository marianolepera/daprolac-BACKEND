const joi = require('@hapi/joi');

const tareaAsocDatoSchema = joi.object().keys({
   idTarea: joi.number().required(),
   obligatorio: joi.boolean().required()
});

const nombreDatoSchema = joi.string().trim().max(60);
const unidadMedidaDatoSchema = joi.string().trim().max(40);
const tipoDatoSchema = joi.string().trim().valid('numero', 'cadena', 'opcion');
const minMaxDatoSchema = joi.number().min(0);
const valorOpcionDatoSchema = joi.object().keys({
    valor: joi.string().trim().max(100),
    id: joi.number()
});
const valoresOpcionDatoSchema = joi.array().items(valorOpcionDatoSchema);

const rangoDatoSchema = joi.when('tipo', {
    is: 'numero',
    then: minMaxDatoSchema.required()
});

const opcionesDatoSchema = joi.when('tipo', {
    is: 'opcion',
    then: valoresOpcionDatoSchema.required()
});

const crearDatoSchema = {
    nombre: nombreDatoSchema.required(),
    unidadMedida: unidadMedidaDatoSchema.required(),
    tipo: tipoDatoSchema.required(),
    minimo: rangoDatoSchema,
    maximo: rangoDatoSchema,
    opciones: opcionesDatoSchema,
    tarea: tareaAsocDatoSchema
}

const actualizarDatoSchema = {
    nombre: nombreDatoSchema,
    unidadMedida: unidadMedidaDatoSchema,
    tipo: tipoDatoSchema,
    minimo: minMaxDatoSchema,
    maximo: minMaxDatoSchema,
    opciones: valoresOpcionDatoSchema,
    tarea: tareaAsocDatoSchema
}

module.exports = {
    crearDatoSchema,
    actualizarDatoSchema
}
