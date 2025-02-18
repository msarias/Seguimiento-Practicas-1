export function SecondaryLogin() {
    return (
      <>
        <div className="contenedor2">
          <div id="cbz3">
            <p id="namepage">Seguimiento Etapa Practica</p>
          </div>
          <div className="contenedor3">
            <div id="login">
              <div className="ingresotext">
                <p>
                  Ingreso
                  <br />
                  Seguimiento
                </p>
                <div className="login-container">
                  <form
                    style="transition: opacity 0.2s ease-in-out 0s, transform 0.2s ease-in-out 0s; transform: scale(1);"
                    className=""
                  />
                  <label className="login-label">Tipo de Cuenta</label>
                  <select className="login-select" name="typeDocument">
                    <option>Seleccione su tipo de cuenta</option>
                    <option>Instructor</option>
                    <option>Aprendiz</option>
                  </select>
                  <label className="login-label">Número de Documento</label>
                  <input
                    type="text"
                    className="numeroidentidad"
                    title="Número de documento"
                    placeholder="Ingrese su documento"
                    pattern="[0-9]+"
                    required
                  />
                  <label className="login-label">Contraseña</label>
                  <input
                    type="password"
                    className="password"
                    title="Contraseña"
                    placeholder="Ingrese su Contraseña"
                    required
                    autocomplete="nop"
                  />
                  <a className="new-password" href="">
                    Olvidé mi contraseña
                  </a>
                  <br />
                  <a className="new-password" href="">
                    Mi cuenta esta inactiva o bloqueada
                  </a>
                  <button type="submit" name="login-boton" className="login-boton">
                    <a href="./inicio/index.html">Iniciar Sesión </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  