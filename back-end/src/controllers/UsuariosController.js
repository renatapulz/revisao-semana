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

            // Verifica se o usuário autenticado é o dono da conta ou um administrador
            if (parseInt(id) !== req.usuarioId && req.permissao !== 'admin') {
                return res.status(403).json({ mensagem: 'Ação não permitida. Você só pode deletar sua própria conta.' });
            }
            
            await usuario.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ mensagem: 'Erro ao deletar usuário.', error });
        }
    }

    async getUsersAll (req, res) {
        try {
            const usuarios = await Usuario.findAll();
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar a lista de usuários' });
        }
    };

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByPk(id);
            
            if (!usuario) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
            }

            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar o usuário' });
        }
    }
    
    async editUser(req, res) {
        try {
            const { id } = req.params;
            const { nome, email, senha, permissao } = req.body;

            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            if (req.permissao === 'admin') {
                usuario.nome = nome || usuario.nome;
                usuario.email = email ? email.toLowerCase() : usuario.email;
                if (senha) {
                    usuario.senha = await bcrypt.hash(senha, 10);
                }
                usuario.permissao = permissao || usuario.permissao;
            } else if (parseInt(id) === req.usuarioId) {
                usuario.nome = nome || usuario.nome;
                usuario.email = email ? email.toLowerCase() : usuario.email;
                if (senha) {
                    usuario.senha = await bcrypt.hash(senha, 10);
                }
            } else {
                return res.status(403).json({ error: 'Ação não permitida.' });
            }

            await usuario.save();

            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar usuário' });
        }
    }

}

module.exports = new UsuariosController()