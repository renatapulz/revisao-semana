const { Router } = require('express')
const UsuariosController = require('../controllers/UsuariosController')
const validaToken = require('../middlewares/validaToken')

const UsuariosRoutes = new Router()

UsuariosRoutes.post('/register', (req, res) => UsuariosController.register(req, res));
UsuariosRoutes.delete('/:id', validaToken, (req, res) => UsuariosController.deleteUser(req, res));

module.exports = UsuariosRoutes