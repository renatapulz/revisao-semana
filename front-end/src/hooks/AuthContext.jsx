import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("token");
    if (userId) {
      setUser(userId);
      setLogado(true);
    }
  }, []);

    const login = async (email, password) => {
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha: password })
        });

        const dados = await response.json();

        if (response.ok) {
            localStorage.setItem("token", dados.token);
            setLogado(true);
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
        console.error("Erro ao efetuar login:", error);
        alert("Erro ao efetuar o login. Por favor, tente novamente.");
    }
};  
  
  const cadastro = async (name, email, password) => {
    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        body: JSON.stringify({ nome: name, email, senha: password }),
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
      console.error("Erro ao cadastrar o usuário:", error.message);
      alert(`Erro ao cadastrar o usuário: ${error.message}`);
    }
  };    

  const logout = () => {
    setLogado(false);
    setUser(null);
    localStorage.removeItem("token");
  };

  const isLoggedIn = () => {
    return logado;
  };

  return (
    <AuthContext.Provider value={{ user, logado, login, logout, isLoggedIn, cadastro }}>
      {children}
    </AuthContext.Provider>
  );
}