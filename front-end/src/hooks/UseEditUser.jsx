import { useState, useContext } from 'react';
import { AuthContext } from "./AuthContext";

export const useEditUser = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const editUser = async (id, userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const responseBody = await response.json();
        console.error('Resposta do servidor:', responseBody);
        throw new Error('Erro ao editar o usuário');
      }

      const updatedUser = await response.json();
      return updatedUser;
    } catch (err) {
      setError(err.message);
      console.error('Erro ao editar o usuário:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { editUser, isLoading, error };
};