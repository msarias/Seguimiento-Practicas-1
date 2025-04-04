import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/visitas">
        <button>Visitas</button>
      </Link>
      <Link to="/bitacoras">
        <button>Bitácoras</button>
      </Link>
      <Link to="/reportes">
        <button>Reportes</button>
      </Link>
    </div>
  );
};

export default Sidebar;