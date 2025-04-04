const Header = () => {
  return (
    <header className="header">
      <div className="logos-container">
        <img
          src="../css/img/sena-logo-verde.png"
          alt="SENA Logo"
          id="logo-sena"
          draggable="false"
        />
      </div>
      <div className="title-block">
        <h1 id="title">Seguimiento Etapa Práctica</h1>
      </div>
    </header>
  );
};

export default Header;