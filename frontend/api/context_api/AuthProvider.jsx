import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = function ({ children }) {
  const [auth, set_auth] = useState({ token: localStorage.getItem("token") });

  useEffect(function () {
    const token = localStorage.getItem("token");
    if (token) {
      set_auth({ token });
    }
  }, []);

  const login = function (token) {
    localStorage.setItem("token", token);
    set_auth({ token });
  };

  const logout = function () {
    localStorage.removeItem("token");
    set_auth({ token: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
