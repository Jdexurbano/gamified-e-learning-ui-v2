import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function TeacherRoutes() {
  const { user, token, role } = useContext(AuthContext);

  if (!token) {
    return <Navigate to={"/"} />;
  }

  return role === "teacher" ? <Outlet /> : <Navigate to={"s/home"} />;
}

export default TeacherRoutes;
