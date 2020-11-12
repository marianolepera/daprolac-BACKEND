const Sequilize = require('sequelize');
const db = require('../config/mysql');

const proceso = require('../models/proceso');
const ordenTarea = require('../models/orden-tarea');

const orden = db.define('orden', {
    id: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
    },
    idProceso: {
        type: Sequilize.INTEGER,
        allowNull: false,
        references: {
            model: proceso,
            key: 'id'
        },
    },
    numero: {
        type: Sequilize.INTEGER,
        allowNull: false
    },
    finalizada: {
        type: Sequilize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

orden.belongsTo(proceso, { as: 'proceso', foreignKey: 'idProceso' });
orden.hasMany(ordenTarea, { as: 'tareas', foreignKey: 'idOrden' });

module.exports = orden;
