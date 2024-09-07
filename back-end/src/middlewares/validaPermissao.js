function validaPermissao(req, res, next) {
    const usuarioLogadoId = req.usuarioId;
    const usuarioLogadoPermissao = req.permissao;
    const { id } = req.params;

    if (usuarioLogadoPermissao === 'admin') {
        return next();
    }

    if (usuarioLogadoId === parseInt(id)) {
        return next();
    }

    return res.status(403).json({ error: 'Acesso negado. Você não tem permissão para acessar esta rota.' });
}

module.exports = validaPermissao;