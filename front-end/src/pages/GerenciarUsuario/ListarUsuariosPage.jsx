import UseFetchAllUsers from '../../hooks/UseFetchAllUsers';
import './style.css';
import { Link } from 'react-router-dom';

function UsuarioCard({ usuario }) {
  return (
    <div className="card">
      <h3>{usuario.nome}</h3>
      <p>Email: {usuario.email}</p>
      <p>Permissão: {usuario.permissao}</p>
      <Link to={`/users/${usuario.id}`} className="edit-button">
        Editar Usuário
      </Link>
    </div>
  );
}

function ListarUsuariosPage() {
  const { usuarios, loading: isLoading, error: fetchError } = UseFetchAllUsers();

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  if (fetchError) {
    return <p>Erro ao carregar usuários: {fetchError.message}</p>;
  }

  return (
    <div className="container">
      {Array.isArray(usuarios) && usuarios.length > 0 ? (
        usuarios.map((usuario) => (
          <UsuarioCard usuario={usuario} key={usuario.id} />
        ))
      ) : (
        <h2 className='message'>Sem usuários cadastrados.</h2>
      )}
    </div>
  );
}

export default ListarUsuariosPage;