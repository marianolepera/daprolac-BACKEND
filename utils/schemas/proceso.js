const joi = require('@hapi/joi');

const productoProcesoSchema = joi.string().trim().max(100);

const crearProcesoSchema = {
    producto: productoProcesoSchema.required()
}

const actualizarProcesoSchema = {
    producto: productoProcesoSchema.required()
}

module.exports = {
    crearProcesoSchema,
    actualizarProcesoSchema
}
