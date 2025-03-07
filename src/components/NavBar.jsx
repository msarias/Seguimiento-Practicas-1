const Navbar = () => {
  return (
    <nav className="navbar">
      <img
        src="./css/img/sena-logo (1).png"
        alt="Inicio"
        className="navbar-home-img"
      />
      <div className="navbar-items">
        <img
          src="./css/img/user.png"
          alt="Usuario"
          className="navbar-user-img"
        />
        <button className="navbar-logout">Cerrar sesión</button>
      </div>
    </nav>
  );
};

export default Navbar;
