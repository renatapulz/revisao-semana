import React from 'react';
import "./style.css";
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from "react-router-dom";
import useDeleteUser from '../../hooks/UseDeleteUser';

function CardUsuario({ exibirIcones, usuario, onDeleteSuccess }) {
  const { deleteUser } = useDeleteUser();

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      const success = await deleteUser(usuario.id);
      if (success) {
        onDeleteSuccess();
      }
    }
  };

  return (
    <div className="card_container">
      <h3 className="title-card">Usuário:</h3>
      <div className="container-text">
        <div className="info-card">Nome: {usuario.nome}</div>
        <div className="info-card">Email: {usuario.email}</div>
        {exibirIcones && (
          <div className='icons'>
            <DeleteIcon sx={{ fontSize: 25 }} className="icon-card" onClick={handleDelete} />
            <Link to={`/users/${usuario.id}`}>
              <ModeEditIcon sx={{ fontSize: 25 }} className="icon-card" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

CardUsuario.propTypes = {
  exibirIcones: PropTypes.bool.isRequired,
  usuario: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    permissao: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
};

export default CardUsuario;