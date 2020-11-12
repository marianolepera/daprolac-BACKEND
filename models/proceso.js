const Sequilize = require('sequelize');

const db = require('../config/mysql');

const proceso = db.define('proceso', {
    id: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    producto: {
        type: Sequilize.STRING,
        allowNull: false
    }
});

module.exports = proceso;
