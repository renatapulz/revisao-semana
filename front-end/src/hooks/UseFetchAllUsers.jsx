import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

const useFetchAllUsers = () => {
  const { user } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users', {
          headers: {
            'Authorization': `Bearer ${user}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsuarios(data);
        } else {
          const errorMessage = `Erro ao buscar os dados: ${response.status} ${response.statusText}`;
          setError(errorMessage);
        }
      } catch (error) {
        setError("Erro na requisição: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, [user]);

  return { usuarios, loading, error };
};

export default useFetchAllUsers;