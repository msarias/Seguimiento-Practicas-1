import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found-title">Esta página no existe</h1>
      <p className="not-found-message">Inicie sesión para continuar...</p>
      <Link draggable="false" to="/" className="button not-found-link">Volver a inicio</Link>
    </div>
  );
};

export default NotFound;