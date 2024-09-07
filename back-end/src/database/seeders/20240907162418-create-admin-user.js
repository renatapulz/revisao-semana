'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const senhaHash = await bcrypt.hash('teste123', 10);

    await queryInterface.bulkInsert('usuarios', [{
      nome: 'Admin',
      email: 'admin@example.com',
      senha: senhaHash,
      permissao: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', {
      email: 'admin@example.com'
    }, {});
  }
};