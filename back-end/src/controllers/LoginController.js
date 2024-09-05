const Usuario = require("../models/Usuario")
const { compareSync } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const yup = require('yup');

class LoginController {
    async login(request, response) {
        const schema = yup.object().shape({
            email: yup.string().email().required('O email é obrigatório'),
            senha: yup.string().required('A senha é obrigatória')
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
            
            const dados = {
                ...request.body,
                email: request.body.email.toLowerCase()
            };
            
            const usuario = await Usuario.findOne({
                where: {
                    email: dados.email
                }
            });
            if (!usuario) {
                return response
                    .status(404)
                    .json({ mensagem: 'Conta não encontrada' });
            }
            const validatePassword = compareSync(dados.senha, usuario.senha);

            if (!validatePassword) {
                return response
                    .status(401)
                    .json({ mensagem: 'Email ou senha incorretos' });
            }

            // Gera o token JWT
            const token = sign({
                id: usuario.id
            },
                process.env.DB_JWT_SECRET,
                {
                    expiresIn: '1d'
                }
            );

            response.json({
                token: token
            });

        } catch (error) {
            if (error.name === 'ValidationError') {
                return response.status(400).json({ mensagem: 'Erro na validação', errors: error.errors });
            }
            response.status(500).json({ mensagem: 'Erro ao realizar login' });
        }
    }
}

module.exports = new LoginController()