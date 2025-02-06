import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

function PrivateRoutes() {
  const { token } = useContext(AuthContext);

  if (!token) {
    return Navigate("/");
  }
}

export default PrivateRoutes;
