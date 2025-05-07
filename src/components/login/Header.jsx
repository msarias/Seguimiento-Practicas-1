const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img
          src="../assets/img/sena-logo-verde.png"
          alt="SENA Logo"
          id="logo-sena"
          draggable="false"
        />
      </div>
      <div className="title-block">
        <h1 className="title">Seguimiento Etapa Práctica</h1>
      </div>
    </header>
  );
};

export default Header;