const { DataTypes } = require('sequelize')
const connection = require('../database/connection')
const bcrypt = require('bcryptjs');

const Usuario = connection.define("usuarios", {
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissao: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
    }
}, {
    hooks: {
        beforeCreate: async (usuario) => {
            usuario.senha = await bcrypt.hash(usuario.senha, 10);
        }
    }
});

module.exports = Usuario