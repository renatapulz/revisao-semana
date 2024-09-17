import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

const useFetchUser = (userId) => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("ID do usuário não fornecido.");
      setLoading(false);
      return;
    }

    const fetchUserById = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${user}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          setError(`Erro ao buscar os dados: ${response.status}`);
        }
      } catch (error) {
        setError("Erro na requisição: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserById();
  }, [user, userId]);

  return { userData, loading, error };
};

export default useFetchUser;