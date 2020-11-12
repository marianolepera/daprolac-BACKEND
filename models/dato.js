const Sequilize = require('sequelize');
const db = require('../config/mysql');

const datoOpcion = require('../models/dato-opcion');

const dato = db.define('dato', {
    id: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
    },
    nombre: {
        type: Sequilize.STRING(60),
        allowNull: false
    },
    unidadMedida: {
        type: Sequilize.STRING(40),
        allowNull: false
    },
    tipo: {
        type: Sequilize.ENUM('numero', 'cadena', 'opcion'),
        allowNull: false
    },
    minimo: {
        type: Sequilize.DECIMAL(16, 4),
        allowNull: false,
        defaultValue: 0
    },
    maximo: {
        type: Sequilize.DECIMAL(16, 4),
        allowNull: false,
        defaultValue: 0
    }
});

dato.hasMany(datoOpcion, { as: 'opciones', foreignKey: 'idDato' });
datoOpcion.belongsTo(dato, { as: 'dato', foreignKey: 'idDato' });

module.exports = dato;
