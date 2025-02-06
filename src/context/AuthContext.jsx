import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = () => {
  const [user, setUser] = useState();

  const [role, setRole] = useState(localStorage.getItem("role"));
  const [token, setToken] = useState(() =>
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      <Outlet />
    </AuthContext.Provider>
  );
};

export default AuthContext;
