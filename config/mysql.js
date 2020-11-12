const Sequilize = require('sequelize');
const { config } = require('./index');

const USER = config.dbUser;
const PASSWORD = config.dbPassword;
const NAME = config.dbName;
const HOST = config.dbHost;
const PORT = config.dbPort;

const database = new Sequilize(NAME, USER, PASSWORD, {
    host: HOST,
    port: PORT,
    dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true
    },
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = database;
