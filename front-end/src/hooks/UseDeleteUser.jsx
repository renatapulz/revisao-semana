import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const useDeleteUser = () => {
  const { user } = useContext(AuthContext);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Usuário excluído com sucesso.');
        return true;
      } else {
        const errorData = await response.json();
        alert(`Erro ao excluir usuário: ${errorData.mensagem}`);
        return false;
      }
    } catch (error) {
      alert('Erro na requisição: ' + error.message);
      return false;
    }
  };

  return { deleteUser };
};

export default useDeleteUser;