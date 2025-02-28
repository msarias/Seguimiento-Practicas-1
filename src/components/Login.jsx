import '../'

export default function Login() {
  return (
    <div class="login-section">
      <div class="login">
        <form
          style="transition: opacity 0.2s ease-in-out 0s, transform 0.2s ease-in-out 0s; transform: scale(1);"
          id="login-form"
          class="login-form"
        />
        <p>Ingreso Seguimiento</p>
        <label class="login-label">Tipo de Cuenta</label>
        <select class="login-input" name="typeDocument">
          <option disabled>Seleccione su tipo de cuenta</option>
          <option>Instructor</option>
          <option>Aprendiz</option>
        </select>
        <label for="document-input" class="login-label">
          Número de Documento
        </label>
        <input
          id="document-input"
          type="text"
          class="login-input"
          title="Número de documento"
          placeholder="Ingrese su documento"
          pattern="[0-9]+"
          required
        />
        <label for="password-input" class="login-label">
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
        <button type="submit" id="login-button" class="login-button">
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};
