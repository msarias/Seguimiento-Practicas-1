import { Link, replace } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuario');

    navigate('/', { replace: true });

    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Sesión cerrada',
      showConfirmButton: false,
      toast: true,
      timer: 1200,
    });
  };

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
          onClick={handleLogout}
        />
        <img
          src="../css/img/user.png"
          alt="Usuario"
          className="navbar-icon"
          draggable="false"
        />
        <Link to={'/inicio'} draggable="false">
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