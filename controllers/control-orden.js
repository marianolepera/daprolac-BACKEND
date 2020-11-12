const { DateTime } = require('luxon');
const control = require('./control');

const orden = require('../models/orden');
const proceso = require('../models/proceso');
const ordenTarea = require('../models/orden-tarea');
const ordenDato = require('../models/orden-dato');

const utils = require('../utils/utils');
const response = require('../utils/response');

function getProcesoAsoc(req) {
  let fechaIniciaProp = Date.now();
  if (req.body.fechaIniciaProp) {
    const fecha = new Date(req.body.fechaIniciaProp);
    fechaIniciaProp = fecha.getTime();
  }

  return {
    idProceso: req.body.idProceso,
    fechaIniciaProp: fechaIniciaProp,
    numero: req.body.numero ? req.body.numero : 0,
    tareas: req.body.tareas ? req.body.tareas : []
  };
}

async function createTareasOrden(objAsoc, idOrden, trans) {
  // Obtengo el proceso que me llego en la consulta
  const objProceso = await proceso
      .findOne({
        where: objAsoc.idProceso,
        include: [{ all: true, nested: true }],
        transaction: trans
      });

  // El proceso debe tener tareas asociadas
  if (!objProceso.tareas.length) {
    throw response.customError('El proceso seleccionado no cuenta con tareas asociadas.', 409);
  }

  const tareasOrden = [];
  const datosOrden = [];

  let fechaIniciaProp = DateTime.fromMillis(objAsoc.fechaIniciaProp);
  const tareasSort = utils.sortTareas(objProceso.tareas);

  tareasSort.forEach( tarea => {
    if (tarea.proceso_tarea.idTareaAntecesora) {
      fechaIniciaProp = fechaIniciaProp
          .plus({
            days: tarea.proceso_tarea.diasAntecesora,
            hours: tarea.proceso_tarea.horasAntecesora,
            minutes: tarea.proceso_tarea.minutosAntecesora
          });
    }

    tareasOrden.push({
      idOrden: idOrden,
      idTarea: tarea.id,
      fechaIniciaProp: fechaIniciaProp.toJSDate()
    });

    tarea.datos.forEach( dato => {
      datosOrden.push({
        idOrden: idOrden,
        idTarea: tarea.id,
        idDato: dato.id
      });
    });
  });

  await ordenTarea.bulkCreate(tareasOrden, { transaction: trans, validate: true });
  await ordenDato.bulkCreate(datosOrden, { transaction: trans, validate: true });
}

async function updateTareasOrden(objAsoc, idOrden, trans) {
  const tareasOrden = [];
  const datosOrden = [];
  const camposActualiza = []

  objAsoc.tareas.forEach( tarea => {
    const t = {
      idOrden: idOrden,
      idTarea: tarea.idTarea,
    };
    if (tarea.fechaInicia) {
      const fechaI = new Date(tarea.fechaInicia);
      t.fechaInicia = fechaI.getTime();
      camposActualiza.push('fechaInicia');
    }
    if (tarea.fechaFin) {
      const fechaF = new Date(tarea.fechaFin);
      t.fechaFin = fechaF.getTime();
      camposActualiza.push('fechaFin');
    }
    if (tarea.idUsuario) {
      t.idUsuario = tarea.idUsuario;
      camposActualiza.push('idUsuario');
    }
    tareasOrden.push(t);

    if (tarea.datos) {
      tarea.datos.forEach(dato => {
        datosOrden.push({
          idOrden: idOrden,
          idTarea: tarea.idTarea,
          idDato: dato.idDato,
          valor: dato.valor
        });
      });
    }
  });

  if (camposActualiza.length) {
    await ordenTarea.bulkCreate(tareasOrden, {
          transaction: trans,
          updateOnDuplicate: camposActualiza
        });
  }
  await ordenDato.bulkCreate(datosOrden, {
        transaction: trans,
        updateOnDuplicate: ['valor']
      });
}

exports.setOrdenNumero = async (req, res, next) => {
  if (!req.body.numero || (req.body.numero && req.body.numero === 0)) {
    const resultado = await orden.max('numero');
    let numero = resultado ? resultado : 0;
    req.body.numero = ++numero;
  }
  next();
}

exports.obtenerOrdenes = async (req, res, next) => { control.obtener(req, res, next, orden); }

exports.crearOrden = async (req, res, next) => {
  const procesoAsoc = getProcesoAsoc(req);
  control.crear(req, res, next, orden, procesoAsoc, createTareasOrden);
}
exports.actualizarOrden = async (req, res, next) => {
  const procesoAsoc = getProcesoAsoc(req);
  control.actualizar(req, res, next, orden, procesoAsoc, updateTareasOrden);
}
exports.eliminarOrden = async (req, res, next) => { control.eliminar(req, res, next, orden); }
