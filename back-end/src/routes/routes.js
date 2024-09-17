const { Router } = require('express')
const UsuariosRoutes = require('./usuarios.routes')
const LoginController = require('../controllers/LoginController')

const routes = new Router()

routes.use('/users', UsuariosRoutes)
routes.post('/login', LoginController.login)

module.exports = routes