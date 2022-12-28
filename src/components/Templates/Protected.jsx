import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext.jsx";

const Protected = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  return user ? <Outlet /> : <Navigate to='/' state={{ from: location }} replace />;
};

export default Protected;
