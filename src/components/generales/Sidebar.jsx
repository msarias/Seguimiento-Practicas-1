import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/visitas">
        <button className="sidebar-button">Visitas</button>
      </Link>
      <Link to="/bitacoras">
        <button className="sidebar-button">Bitácoras</button>
      </Link>
      <Link to="/reportes">
        <button className="sidebar-button">Reportes</button>
      </Link>
    </div>
  );
};

export default Sidebar;