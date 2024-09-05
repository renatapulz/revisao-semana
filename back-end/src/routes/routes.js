const { Router } = require('express')

const routes = new Router()

/* coloque  suas rotas aqui */

routes.get('/', (request, response) => {
    response.send("Bem vindo")
})

module.exports = routes