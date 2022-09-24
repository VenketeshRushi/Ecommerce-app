import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function PrivateRoutes({ children }) {
  const { state } = useContext(AuthContext);
  if (!state.isAuth) { 
    return <Navigate to="/" />
  }
  return children;
}
export default PrivateRoutes;
