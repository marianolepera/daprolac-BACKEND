const Sequilize = require('sequelize');
const db = require('../config/mysql');

const tarea = require('./tarea');
const dato = require('./dato');

const tareaDato = db.define('tarea_dato', {
    idTarea: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: tarea,
            key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    },
    idDato: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: dato,
            key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    },
    obligatorio: {
        type: Sequilize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

tarea.belongsToMany(dato, { as: 'datos', through: 'tarea_dato', foreignKey: 'idTarea', otherKey: 'idDato'});
dato.belongsToMany(tarea, { as: 'tareas', through: 'tarea_dato', foreignKey: 'idDato', otherKey: 'idTarea'});

module.exports = tareaDato;
