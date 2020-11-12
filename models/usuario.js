const Sequilize = require('sequelize');
const bcrypt = require('bcrypt');

const db = require('../config/mysql');
const response = require('../utils/response');

async function getPasswordHash(usuario) {
    const saltos = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(usuario.clave, saltos);

    return hash;
}

const usuario = db.define('usuario', {
    id: {
        type: Sequilize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
    },
    nombre: {
        type: Sequilize.STRING(45),
        allowNull: false
    },
    apellido: {
        type: Sequilize.STRING(45),
        allowNull: false
    },
    email: {
        type: Sequilize.STRING(100),
        allowNull: false,
        unique: true
    },
    clave: {
        type: Sequilize.STRING(100),
        allowNull: false
    },
    tipo: {
        type: Sequilize.INTEGER,
        defaultValue: 0
    }
}, {
    defaultScope: {
      attributes: { exclude: ['clave'] }
    },
    hooks: {
        async beforeCreate(usuario) {
            try {
                usuario.clave = await getPasswordHash(usuario);
            } catch (err) {
                throw response.customError('Error encriptando clave de usuario. ' + err.message(), 500);
            }
        },
        async beforeUpdate(usuario, options) {
            try {
                console.log('OPCIONES:', options);
                const cmp = await bcrypt.compare(usuario.clave, usuario._previousDataValues.clave);
                console.log(usuario.dataValues.clave, usuario._previousDataValues.clave);
                if (!cmp && usuario._previousDataValues.clave != usuario.dataValues.clave) {
                    usuario.clave = await getPasswordHash(usuario);
                } else {
                    usuario.clave = usuario._previousDataValues.clave;
                }
            } catch (err) {
                throw response.customError('Error encriptando clave de usuario. ' + err.message, 500);
            }
        }
    }
});

module.exports = usuario;
