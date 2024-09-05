const Usuario = require('../models/Usuario')
const yup = require('yup')
const { Op } = require('sequelize');

class UsuariosController {
    async register(req, res) {
        const schema = yup.object().shape({
            nome: yup.string().required('Nome é um campo obrigatório.'),
            senha: yup.string().required('Senha é um campo obrigatório.'),
            email: yup.string().email().required('Email é um campo obrigatório.')
        });

        try {
            await schema.validate(req.body, { abortEarly: false });

            const usuarioExistente = await Usuario.findOne({
                where: {
                    [Op.or]: [
                        { email: req.body.email.toLowerCase() }
                    ]
                }
            });

            if (usuarioExistente) {
                return res.status(400).json({
                    mensagem: 'Email já cadastrado.'
                });
            }

            const usuario = await Usuario.create({
                ...req.body,
                email: req.body.email.toLowerCase()
            });
            
            res.status(201).json({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                createdAt: usuario.createdAt
            })
        } catch (error) {
            if (error.name === 'ValidationError') {
                res.status(400).json({ mensagem: 'Erro no cadastramento', errors: error.errors });
            } else {
                res.status(500).json({ mensagem: 'Erro ao cadastrar o usuário.', error });
            }
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;

            const usuario = await Usuario.findByPk(id);

            if (!usuario) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
            }

            // Verifica se o usuário autenticado é o dono da conta que está tentando deletar
            if (parseInt(id) !== req.usuarioId) {
                return res.status(403).json({ mensagem: 'Ação não permitida. Você só pode deletar sua própria conta.' });
            }
            await usuario.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao deletar usuário.', error });
        }
    }
}

module.exports = new UsuariosController()