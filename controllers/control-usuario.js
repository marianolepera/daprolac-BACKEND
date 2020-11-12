const control = require('./control');
const usuario = require('../models/usuario');

exports.loginUsuario = async (req, res, next) => { control.login(req, res, next, usuario); }
exports.obtenerUsuarios = async (req, res, next) => { control.obtener(req, res, next, usuario); }
exports.crearUsuario = async (req, res, next) => { control.crear(req, res, next, usuario); }
exports.actualizarUsuario = async (req, res, next) => { control.actualizar(req, res, next, usuario); }
exports.eliminarUsuario = async (req, res, next) => { control.eliminar(req, res, next, usuario); }

