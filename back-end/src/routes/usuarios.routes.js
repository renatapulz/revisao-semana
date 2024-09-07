const { Router } = require('express')
const UsuariosController = require('../controllers/UsuariosController')
const validaToken = require('../middlewares/validaToken')
const validaPermissao = require('../middlewares/validaPermissao')

const UsuariosRoutes = new Router()

UsuariosRoutes.post('/register', (req, res) => UsuariosController.register(req, res));
UsuariosRoutes.delete('/:id', validaToken, validaPermissao, (req, res) => UsuariosController.deleteUser(req, res));
UsuariosRoutes.get('/', validaToken, validaPermissao, (req, res) => UsuariosController.getUsersAll(req, res));
UsuariosRoutes.get('/:id', validaToken, validaPermissao, (req, res) => UsuariosController.getUserById(req, res));
UsuariosRoutes.put('/:id', validaToken, validaPermissao, (req, res) => UsuariosController.editUser(req, res));

module.exports = UsuariosRoutes