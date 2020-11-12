const control = require('./control');

const dato = require('../models/dato');
const datoOpcion = require('../models/dato-opcion');
const tareaDato = require('../models/tarea-dato');

function getObjetoDatoAsoc(req) {
    let datoAsoc = {}

    if (req.body.opciones) { datoAsoc.opciones = req.body.opciones };
    if (req.body.tarea) {
        datoAsoc.idTarea = req.body.tarea.idTarea;
        datoAsoc.obligatorio = req.body.tarea.obligatorio;
    }

    return datoAsoc;
}

async function existeDatoTarea(idTarea, idDato, trans) {
    const resultado = await tareaDato.findOne({
        where: {
            idTarea: idTarea,
            idDato: idDato
        },
        transaction: trans
    });

    return resultado !== null;
}

async function setAsociacionesDato(objAsoc, idDato, trans) {
    if (objAsoc.opciones) {
        objAsoc.opciones.forEach((item) => item.idDato = idDato);
        await datoOpcion.bulkCreate(objAsoc.opciones, { transaction: trans, updateOnDuplicate: ['valor'] });
    }

    if (objAsoc.idTarea) {
      objAsoc.idDato = idDato;

      if (await existeDatoTarea(objAsoc.idTarea, objAsoc.idDato, trans)) {
        return tareaDato.update(objAsoc, {
          where: {
            idTarea: objAsoc.idTarea,
            idDato: objAsoc.idDato
          },
          transaction: trans
        });
      } else {
        return tareaDato.create(objAsoc, { transaction: trans });
      }
    }
}

exports.obtenerDatos = async (req, res, next) => { control.obtener(req, res, next, dato); }

exports.crearDato = async (req, res, next) => {
    let opciones = getObjetoDatoAsoc(req);
    control.crear(req, res, next, dato, opciones, setAsociacionesDato);
}

exports.actualizarDato = async (req, res, next) => {
    let opciones = getObjetoDatoAsoc(req);
    control.actualizar(req, res, next, dato, opciones, setAsociacionesDato);
}

exports.eliminarDato = async (req, res, next) => { control.eliminar(req, res, next, dato); }
