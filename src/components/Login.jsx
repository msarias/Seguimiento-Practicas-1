const Login = () => {
  return (
    <div className="login-section">
      <div className="login">
        <form className="login-form" id="login-form">
          <p id="login-paragraph">Ingreso Seguimiento</p>
          <label className="login-label">Tipo de Cuenta</label>
          <select className="login-input" name="typeDocument">
            <option disabled>Seleccione su tipo de cuenta</option>
            <option>Instructor</option>
            <option>Aprendiz</option>
          </select>
          <label className="login-label" for="document-input">
            Número de Documento
          </label>
          <input
            className="login-input"
            id="document-input"
            type="text"
            title="Número de documento"
            placeholder="Ingrese su documento"
            pattern="[0-9]+"
            required
          />
          <label className="login-label" for="password-input">
            Contraseña
          </label>
          <input
            id="password-input"
            type="password"
            className="login-input"
            title="Contraseña"
            placeholder="Ingrese su contraseña"
            required
            autocomplete="nop"
          />
          <div className="recovery-block">
            <a className="new-password" href="#">
              Olvidé mi contraseña
            </a>
            <a className="new-password" href="#">
              Mi cuenta está inactiva
            </a>
          </div>
          <button className="login-button" id="login-button" type="submit">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
