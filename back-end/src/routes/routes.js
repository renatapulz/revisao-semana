const { Router } = require('express')
const UsuariosRoutes = require('./usuarios.routes')
const LoginController = require('../controllers/LoginController')

const routes = new Router()

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc.swagger.json');

routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes.use('/users', UsuariosRoutes)
routes.post('/login', LoginController.login
/*
        #swagger.tags = ['Usuários']
        #swagger.description = 'Endpoint para logar um usuário.'
        #swagger.parameters['loginUsuario'] = {
            in: 'body',
            description: 'Credenciais de login do usuário.',
            required: true,
            schema: { 
                $email: "teste@gmail.com",
                $senha: "teste123"
            }
        }
        #swagger.responses[200] = {
            description: 'Usuário logado com sucesso.',
            schema: {
                token: "jwt_token_aqui"
            }
        }
        #swagger.responses[400] = {
            description: 'Erro na validação dos dados de entrada.',
            schema: {
                mensagem: 'Erro na validação',
                errors: ['Detalhes do erro']
            }
        }
        #swagger.responses[404] = {
            description: 'Conta não encontrada.',
            schema: {
                mensagem: 'Conta não encontrada'
            }
        }
        #swagger.responses[401] = {
            description: 'Email ou senha incorretos.',
            schema: {
                mensagem: 'Email ou senha incorretos'
            }
        }
        #swagger.responses[500] = {
            description: 'Erro ao realizar login.',
            schema: {
                mensagem: 'Erro ao realizar login'
            }
        }
    */
);

module.exports = routes