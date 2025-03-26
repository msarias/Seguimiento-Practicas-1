const Navbar = () => {
    return (
      <nav className="navbar">
        <img
          src="./css/img/sena-logo (1).png"
          alt="Inicio"
          className="navbar-home-img"
        />
        
        <div className="navbar-items">
        <input
      type="text"
      placeholder="Buscar..."
      className="search-input"
  />
  
          <img
            src="./css/img/user.png"
            alt="Usuario"
            className="navbar-user-img"
          />
          
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  