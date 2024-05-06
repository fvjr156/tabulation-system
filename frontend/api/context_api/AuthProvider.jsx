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
  const loginerrmsglogout = function () {
    localStorage.removeItem("token");
    set_auth({ token: null });
    return 'Logged out successfully!';
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loginerrmsglogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
