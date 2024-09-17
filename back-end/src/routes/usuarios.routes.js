const { Router } = require('express')
const UsuariosController = require('../controllers/UsuariosController')
const validaToken = require('../middlewares/validaToken')
const validaPermissao = require('../middlewares/validaPermissao')

const UsuariosRoutes = new Router()

UsuariosRoutes.post('/register', (req, res) => UsuariosController.register(req, res)
/*
    #swagger.tags = ['Usuários']
    #swagger.description = 'Endpoint para cadastrar um novo usuário.'
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Informações do usuário para cadastro.',
        required: true,
        schema: { 
            $nome: "João da Silva",
            $email: "joao.silva@example.com",
            $senha: "senha123"
        }
    }
    #swagger.responses[201] = {
        description: 'Usuário cadastrado com sucesso.',
        schema: {
            id: 1,
            nome: "João da Silva",
            email: "joao.silva@example.com",
            createdAt: "2024-09-01T00:00:00.000Z"
        }
    }
    #swagger.responses[400] = {
        description: 'Erro na validação dos dados de entrada ou email já cadastrado.',
        schema: {
            mensagem: 'Email já cadastrado.'  // ou 'Erro no cadastramento',
            errors: ['Nome é um campo obrigatório.', 'Senha é um campo obrigatório.', 'Email é um campo obrigatório.']
        }
    }
    #swagger.responses[500] = {
        description: 'Erro ao tentar cadastrar o usuário.',
        schema: {
            mensagem: 'Erro ao cadastrar o usuário.',
            error: 'Detalhes do erro'
        }
    }
    */
);

UsuariosRoutes.delete('/:id', validaToken, validaPermissao, (req, res) => UsuariosController.deleteUser(req, res)
 /*
    #swagger.tags = ['Usuários']
    #swagger.description = 'Endpoint para excluir um usuário. Somente o prórpio usuário autenticado ou um administrador pode realizar esta ação.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do usuário a ser excluído.',
        required: true,
        type: 'integer',
        example: 1
    }
    #swagger.responses[204] = {
        description: 'Usuário excluído com sucesso. Nenhum conteúdo retornado.',
    }
    #swagger.responses[403] = {
        description: 'Ação não permitida. O usuário só pode deletar sua própria conta ou um administrador pode excluir qualquer conta.',
        schema: {
            mensagem: 'Ação não permitida. Você só pode deletar sua própria conta.'
        }
    }
    #swagger.responses[404] = {
        description: 'Usuário não encontrado com o ID fornecido.',
        schema: {
            mensagem: 'Usuário não encontrado.'
        }
    }
    #swagger.responses[500] = {
        description: 'Erro ao tentar excluir o usuário.',
        schema: {
            mensagem: 'Erro ao deletar usuário.',
            error: 'Detalhes do erro'
        }
    }
    */
);

UsuariosRoutes.get('/', validaToken, validaPermissao, (req, res) => UsuariosController.getUsersAll(req, res)
/*
    #swagger.tags = ['Usuários']
    #swagger.description = 'Endpoint para obter a lista de todos os usuários.'
    #swagger.responses[200] = {
        description: 'Lista de usuários retornada com sucesso.',
        schema: {
            type: 'array',
        }
    }
    #swagger.responses[500] = {
        description: 'Erro ao buscar a lista de usuários.',
        schema: {
            error: 'Erro ao buscar a lista de usuários'
        }
    }
    */
);

UsuariosRoutes.get('/:id', validaToken, validaPermissao, (req, res) => UsuariosController.getUserById(req, res)
/*
    #swagger.tags = ['Usuários']
    #swagger.description = 'Endpoint para obter um usuário pelo ID.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do usuário a ser buscado.',
        required: true,
        type: 'integer',
        example: 1
    }
    #swagger.responses[200] = {
        description: 'Usuário retornado com sucesso.',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'integer', example: 1 },
                nome: { type: 'string', example: 'Maria Oliveira' },
                email: { type: 'string', example: 'maria.oliveira@example.com' },
                permissao: { type: 'string', example: 'admin' },
                createdAt: { type: 'string', format: 'date-time', example: '2024-09-01T12:00:00.000Z' },
                updatedAt: { type: 'string', format: 'date-time', example: '2024-09-01T12:00:00.000Z' }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Usuário não encontrado com o ID fornecido.',
        schema: {
            mensagem: 'Usuário não encontrado.'
        }
    }
    #swagger.responses[500] = {
        description: 'Erro ao buscar o usuário.',
        schema: {
            error: 'Erro ao buscar o usuário'
        }
    }
*/
);

UsuariosRoutes.put('/:id', validaToken, validaPermissao, (req, res) => UsuariosController.editUser(req, res)
/*
    #swagger.tags = ['Usuários']
    #swagger.description = 'Endpoint para atualizar um usuário pelo ID. Administradores podem atualizar qualquer usuário, enquanto usuários comuns só podem atualizar suas próprias informações.'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do usuário a ser atualizado.',
        required: true,
        type: 'integer',
        example: 1
    }
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Dados do usuário a serem atualizados.',
        required: true,
        schema: { 
            $nome: "Maria Oliveira",
            $email: "maria.oliveira@example.com",
            $senha: "novaSenha123",
            permissao: "admin"  // Este campo só será aceito se o usuário for um administrador
        }
    }
    #swagger.responses[200] = {
        description: 'Usuário atualizado com sucesso.',
        schema: {
            id: 1,
            nome: "Maria Oliveira",
            email: "maria.oliveira@example.com",
            permissao: "admin",
            updatedAt: "2024-09-01T12:00:00.000Z"
        }
    }
    #swagger.responses[400] = {
        description: 'Erro na validação dos dados de entrada.',
        schema: {
            mensagem: 'Erro na validação dos dados.',
            errors: ['Nome é um campo obrigatório.', 'Email é um campo obrigatório.', 'Senha deve ter no mínimo 6 caracteres.']
        }
    }
    #swagger.responses[403] = {
        description: 'Ação não permitida. Usuário não pode atualizar dados de outro usuário.',
        schema: {
            mensagem: 'Ação não permitida. Você não tem permissão para atualizar este usuário.'
        }
    }
    #swagger.responses[404] = {
        description: 'Usuário não encontrado com o ID fornecido.',
        schema: {
            mensagem: 'Usuário não encontrado.'
        }
    }
    #swagger.responses[500] = {
        description: 'Erro ao atualizar usuário.',
        schema: {
            mensagem: 'Erro ao atualizar usuário.',
            error: 'Detalhes do erro'
        }
    }
*/
);

module.exports = UsuariosRoutes