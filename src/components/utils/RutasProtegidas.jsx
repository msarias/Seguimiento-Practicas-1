import { Navigate, Outlet } from "react-router-dom";

const RutasProtegidas = ({acceso, redireccion = "/"}) => {
  if (!acceso) {
    return <Navigate to={redireccion} replace />;
  }
  return <Outlet />;
};

export default RutasProtegidas;