import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img
        src="../css/img/sena-logo-verde.png"
        alt="Inicio"
        className="navbar-logo"
        draggable="false"
      />
      <div className="navbar-items">
        <input
          type="button"
          value="Cerrar sesión"
          className="navbar-logout"
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/';
          }}
        />
        <img
          src="../css/img/user.png"
          alt="Usuario"
          className="navbar-icon"
          draggable="false"
        />
        <Link to={'/Inicio'} draggable="false">
          <img
            src="../css/img/home.png"
            alt="Home"
            className="navbar-icon"
            draggable="false"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;