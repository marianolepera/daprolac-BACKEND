const control = require('./control');
const proceso = require('../models/proceso');

exports.obtenerProcesos = async (req, res, next) => { control.obtener(req, res, next, proceso); }
exports.crearProceso = async (req, res, next) => { control.crear(req, res, next, proceso); }
exports.actualizarProceso = async (req, res, next) => { control.actualizar(req, res, next, proceso); }
exports.eliminarProceso = async (req, res, next) => { control.eliminar(req, res, next, proceso); }
