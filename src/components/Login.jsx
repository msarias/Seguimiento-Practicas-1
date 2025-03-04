const Login = () => {
  return (
    <div class="login-section">
      <div class="login">
        <form class="login-form" id="login-form">
          <p id="login-paragraph">Ingreso Seguimiento</p>
          <label class="login-label">Tipo de Cuenta</label>
          <select class="login-input" name="typeDocument">
            <option disabled>Seleccione su tipo de cuenta</option>
            <option>Instructor</option>
            <option>Aprendiz</option>
          </select>
          <label class="login-label" for="document-input">
            Número de Documento
          </label>
          <input
            class="login-input"
            id="document-input"
            type="text"
            title="Número de documento"
            placeholder="Ingrese su documento"
            pattern="[0-9]+"
            required
          />
          <label class="login-label" for="password-input">
            Contraseña
          </label>
          <input
            id="password-input"
            type="password"
            class="login-input"
            title="Contraseña"
            placeholder="Ingrese su contraseña"
            required
            autocomplete="nop"
          />
          <div class="recovery-block">
            <a class="new-password" href="#">
              Olvidé mi contraseña
            </a>
            <a class="new-password" href="#">
              Mi cuenta está inactiva
            </a>
          </div>
          <button class="login-button" id="login-button" type="submit">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
