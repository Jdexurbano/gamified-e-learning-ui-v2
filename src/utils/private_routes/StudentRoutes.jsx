import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function StudentRoutes() {
  const { user, token, role } = useContext(AuthContext);

  if (!token) {
    return <Navigate to={"/"} />;
  }

  return role === "student" ? <Outlet /> : <Navigate to={"s/home"} />;
}

export default StudentRoutes;
