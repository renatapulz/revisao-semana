import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logado, setLogado] = useState(false);
  const [userLength, setUserLength] = useState();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUser(userId);
      setLogado(true);
    }
  }, []);

  const getUsersLength = () => {
    fetch("http://localhost:3000/users")
      .then(response => response.json())
      .then(dados => setUserLength(dados.length))
      .catch(erro => console.log(erro));
  }

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const dados = await response.json();
      
      const usuario = dados.find(user => user.email === email);

      if (usuario) {
        if (usuario.password === password) {
          localStorage.setItem("userId", usuario.id);
          setLogado(true);
          window.location.href = "/";
        } else {
          alert("Senha incorreta!");
        }
      } else {
        alert("Usuário não cadastrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const cadastro = (name, email, password) => {
    fetch("http://localhost:3000/users")
      .then(response => response.json())
      .then(dados => {
        const user = dados.find(user => user.email === email);
        if (user) {
          alert("Email já cadastrado.");
          return;
        }
        return fetch("http://localhost:3000/users", {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          if (response.ok) {
            alert("Usuário cadastrado com sucesso! Por favor, efetue o login.");
            window.location.href = "/login";
          } else {
            throw new Error("Erro ao cadastrar usuário!");
          }
        })
        .catch(error => {
          console.error("Erro ao cadastrar usuário:", error.message);
          alert("Erro ao cadastrar usuário!");
        });
      })
      .catch(error => {
        console.error("Erro ao tentar cadastrar:", error.message);
        alert("Erro ao tentar cadastrar. Tente novamente.");
      });
  };

  const logout = () => {
    setLogado(false);
    setUser(null);
    localStorage.removeItem("userId");
  };

  const isLoggedIn = () => {
    return logado;
  };

  return (
    <AuthContext.Provider value={{ user, logado, login, logout, isLoggedIn, cadastro, getUsersLength, userLength }}>
      {children}
    </AuthContext.Provider>
  );
}