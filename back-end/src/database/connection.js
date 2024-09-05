const { Sequelize } = require('sequelize');
const databaseConfig = require('../config/database.config')

const connection = new Sequelize(databaseConfig)

module.exports = connection;