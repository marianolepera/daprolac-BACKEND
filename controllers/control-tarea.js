const control = require('./control');

const tarea = require('../models/tarea');
const procesoTarea = require('../models/proceso-tarea');

const response = require('../utils/response');

function getObjetoProcesoTarea(req) {
    let procesoAsoc = {};

    // Verifico si tiene un proceso asociado
    if (req.body.proceso) {
        procesoAsoc.idProceso = req.body.proceso.idProceso;

        // verifico si tiene asociada una tarea antecesora
        if (req.body.proceso.tareaAntecesora) {
            procesoAsoc.idTareaAntecesora = req.body.proceso.tareaAntecesora.idTareaAntecesora;
            procesoAsoc.diasAntecesora = req.body.proceso.tareaAntecesora.diasAntecesora;
            procesoAsoc.horasAntecesora = req.body.proceso.tareaAntecesora.horasAntecesora;
            procesoAsoc.minutosAntecesora = req.body.proceso.tareaAntecesora.minutosAntecesora;
        }
    }

    return procesoAsoc;
}

async function existeTareaProceso(idTarea, idProceso, trans) {
    const resultado = await procesoTarea.findOne({
        where: {
            idTarea: idTarea,
            idProceso: idProceso
        },
        transaction: trans
    });

    return resultado !== null;
}

async function setTareaProceso(objAsoc, idTarea, trans) {
    objAsoc.idTarea = idTarea;

    if (objAsoc.idTareaAntecesora) {
        // la terea antecesora no puede ser la misma tarea
        if (objAsoc.idTareaAntecesora == objAsoc.idTarea) {
            throw response.customError('La tarea antecesora no puede ser la misma tarea.', 409);
        }

        // la tarea antecesora solo se puede asociar si la misma ya se encuentra asociada al mismo proceso
        if (! await existeTareaProceso(objAsoc.idTareaAntecesora, objAsoc.idProceso, trans)) {
            throw response.customError('La tarea antecesora debe estar asociada al proceso.', 409);
        }
    }

    // chequeo si debo actualizar o crear la asociacion
    if (await existeTareaProceso(objAsoc.idTarea, objAsoc.idProceso, trans)) {
        return procesoTarea.update(objAsoc, {
                where: {
                    idTarea: objAsoc.idTarea,
                    idProceso: objAsoc.idProceso
                },
                transaction: trans
            });
    } else {
        return procesoTarea.create(objAsoc, { transaction: trans });
    }
}

exports.obtenerTareas = async (req, res, next) => { control.obtener(req, res, next, tarea); }

exports.crearTarea = async (req, res, next) => {
    const procesoAsoc = getObjetoProcesoTarea(req);
    control.crear(req, res, next, tarea, procesoAsoc, setTareaProceso);
}

exports.actualizarTarea = async (req, res, next) => {
    const procesoAsoc = getObjetoProcesoTarea(req);
    control.actualizar(req, res, next, tarea, procesoAsoc, setTareaProceso);
}

exports.eliminarTarea = async (req, res, next) => { control.eliminar(req, res, next, tarea);}
