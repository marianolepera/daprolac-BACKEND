const joi = require('@hapi/joi');

const nombreUsuarioSchema = joi.string().trim().max(45);
const apellidoUsuarioSchema = joi.string().trim().max(45);
const emailUsuarioSchema = joi.string().email().trim().max(100);
const claveUsuarioSchema = joi.string().trim().max(100);
const tipoUsuarioSchema = joi.number().min(0).max(1);

const crearUsuarioSchema = {
    nombre: nombreUsuarioSchema.required(),
    apellido: apellidoUsuarioSchema.required(),
    email: emailUsuarioSchema.required(),
    clave: claveUsuarioSchema.required(),
    tipo: tipoUsuarioSchema
}

const actualizarUsuarioSchema = {
    nombre: nombreUsuarioSchema,
    apellido: apellidoUsuarioSchema,
    email: emailUsuarioSchema,
    clave: claveUsuarioSchema,
    tipo: tipoUsuarioSchema
}

const loginUsuarioSchema = {
    email: emailUsuarioSchema.required(),
    clave: claveUsuarioSchema.required()
}

module.exports = {
    crearUsuarioSchema,
    actualizarUsuarioSchema,
    loginUsuarioSchema
}
