import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (username, password) => {
    // Lógica de autenticación
    if (username === 'usuario' && password === 'contraseña') {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  const logout = () => {
    // Lógica de cierre de sesión
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};