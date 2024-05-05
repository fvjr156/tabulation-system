import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = function ({ children }) {
  const [auth, set_auth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, set_auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
