const Navbar = () => {
  return (
    <nav className="navbar">
      <img
        src="./css/img/sena-logo (1).png"
        alt="Inicio"
        className="navbar-home-img"
      />
      <div className="navbar-items">
        <input type="text" className="navbar-search" placeholder="Buscar..." />
        <img
          src="./css/img/foto-persona.png"
          alt="Usuario"
          className="navbar-user-img"
        />
      </div>
    </nav>
  );
};

export default Navbar;
