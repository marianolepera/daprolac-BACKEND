const Sequilize = require('sequelize');

const db = require('../config/mysql');

const tarea = db.define('tarea', {
    id: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    nombre: {
        type: Sequilize.STRING,
        allowNull: false
    },
    observaciones: {
        type: Sequilize.STRING
    },
});

module.exports = tarea;
