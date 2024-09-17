import React from 'react';
import CardUsuario from '../../assets/cardUsuario/cardUsuario';
import useFetchAllUsers from '../../hooks/UseFetchAllUsers';
import './style.css';

function ListarUsuariosPage() {
  const { usuarios, loading, error, refetch } = useFetchAllUsers();

  const handleDeleteSuccess = () => {
    refetch(); // Recarrega a lista de usuários
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro ao carregar usuários: {error}</p>;
  }

  return (
    <div className="container">
      {Array.isArray(usuarios) && usuarios.length > 0 ? (
        usuarios.map((usuario) => (
          <CardUsuario
            key={usuario.id}
            exibirIcones={true}
            usuario={usuario}
            onDeleteSuccess={handleDeleteSuccess}
          />
        ))
      ) : (
        <h2 className="message">Nenhum usuário cadastrado.</h2>
      )}
    </div>
  );
}

export default ListarUsuariosPage;