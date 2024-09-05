const { Router } = require('express')
const UsuariosRoutes = require('./usuarios.routes')
const LoginController = require('../controllers/LoginController')

const routes = new Router()

routes.use('/usuario', UsuariosRoutes)
routes.post('/login', LoginController.login)

module.exports = routes