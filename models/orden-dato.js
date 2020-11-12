const Sequilize = require('sequelize');
const db = require('../config/mysql');

const orden = require('../models/orden');
const tarea = require('../models/tarea');
const dato = require('../models/dato');
const ordenTarea = require('../models/orden-tarea');

const ordenDato = db.define('orden_dato', {
    idOrden: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: orden,
            key: 'id'
        }
    },
    idTarea: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: tarea,
            key: 'id'
        }
    },
    idDato: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: dato,
            key: 'id'
        }
    },
    valor: {
        type: Sequilize.STRING(100)
    }
});

module.exports = ordenDato;
