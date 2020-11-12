const Sequilize = require('sequelize');
const db = require('../config/mysql');

const dato = require('./dato');

const datoOpcion = db.define('dato_opcion', {
    id: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    idDato: {
        type: Sequilize.INTEGER,
        allowNull: false,
        references: {
            model: dato,
            key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
    },
    valor: {
        type: Sequilize.STRING(100),
        allowNull: false
    }
});

module.exports = datoOpcion;
