import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logado, setLogado] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);

  const isTokenValid = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      setUser(token);
      setLogado(true);

      try {
        const decodedToken = jwtDecode(token);
        setIsAdmin(decodedToken.permissao === 'admin');
        setUserId(decodedToken.id || null);
      } catch (error) {
        logout(); // Faz logout se o token for inválido
      }
    } else {
      logout(); // Desloga se o token não for válido ou expirado
    }
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha })
      });

      const dados = await response.json();

      if (response.ok) {
        localStorage.setItem("token", dados.token);
        setUser(dados.token);
        setLogado(true);

        const decodedToken = jwtDecode(dados.token);
        setIsAdmin(decodedToken.permissao === 'admin');
        window.location.href = "/";
      } else {
        let message;
        switch (response.status) {
          case 400:
            message = dados.mensagem || "Erro na solicitação";
            break;
          case 401:
            message = dados.mensagem || "Email ou senha incorretos";
            break;
          default:
            message = dados.mensagem || "Erro desconhecido";
        }
        alert(`Falha no login: ${message}`);
      }
    } catch (error) {
      alert("Erro ao efetuar o login. Por favor, tente novamente.");
    }
  };

  const cadastro = async (nome, email, senha) => {
    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        body: JSON.stringify({ nome, email, senha }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const dados = await response.json();
  
      if (response.ok) {
        alert("Usuário cadastrado com sucesso! Por favor, efetue o login.");
        window.location.href = "/login";
      } else {
        throw new Error(dados.mensagem || "Erro ao cadastrar o usuário!");
      }
    } catch (error) {
      alert(`Erro ao cadastrar o usuário: ${error.message}`);
    }
  }

  const logout = () => {
    setLogado(false);
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("token");
  };

  const isLoggedIn = () => {
    return logado;
  };

  return (
    <AuthContext.Provider value={{ user, logado, isAdmin, userId, login, logout, isLoggedIn, cadastro }}>
      {children}
    </AuthContext.Provider>
  );
}