const joiBase = require('@hapi/joi');
const joiDate = require('@hapi/joi-date');

const joi = joiBase.extend(joiDate);

const numeroOrdenSchema = joi.number().min(0);
const finalizadaOrdenSchema = joi.boolean();
const idProcesoOrdenSchema = joi.number();
const fechaOrdenSchema = joi.date();

const tareaDatoSchema = {
  idDato: joi.number().required(),
  valor: joi.string().required(),
};
const tareaDatosSchema = joi.array().items(tareaDatoSchema);

const ordenTareaSchema = {
  idTarea: joi.number().required(),
  idUsuario: joi.number(),
  fechaInicia: fechaOrdenSchema,
  fechaFin: fechaOrdenSchema,
  datos: tareaDatosSchema
};
const ordenTareasSchema = joi.array().items(ordenTareaSchema);

const crearOrdenSchema = {
  idProceso: idProcesoOrdenSchema.required(),
  numero: numeroOrdenSchema,
  finalizada: finalizadaOrdenSchema,
  fechaIniciaProp: fechaOrdenSchema
};

const actualizarOrdenSchema = {
  finalizada: finalizadaOrdenSchema,
  tareas: ordenTareasSchema
};

module.exports = {
  crearOrdenSchema,
  actualizarOrdenSchema,
};
