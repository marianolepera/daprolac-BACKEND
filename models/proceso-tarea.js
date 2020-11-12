const Sequilize = require('sequelize');
const db = require('../config/mysql');

const tarea = require('./tarea');
const proceso = require('./proceso');

const procesoTarea = db.define('proceso_tarea', {
    idProceso: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: proceso,
            key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    },
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
    idTareaAntecesora: {
        type: Sequilize.INTEGER,
        references: {
            model: tarea,
            key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    },
    diasAntecesora: Sequilize.INTEGER,
    horasAntecesora: Sequilize.INTEGER,
    minutosAntecesora: Sequilize.INTEGER
});

proceso.belongsToMany(tarea, { as: 'tareas', through: 'proceso_tarea', foreignKey: 'idProceso', otherKey: 'idTarea'});
tarea.belongsToMany(proceso, { as: 'procesos', through: 'proceso_tarea', foreignKey: 'idTarea', otherKey: 'idProceso'});

module.exports = procesoTarea;
