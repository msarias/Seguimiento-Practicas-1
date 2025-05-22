import axios from "axios";
import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {API_URL} from "../../api/globalVars";

const LoginForm = () => {
  const [typeAccount, setTypeAccount] = useState("");
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(null);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!typeAccount) return setError("Debe seleccionar un tipo de cuenta.");
    if (!/^\d+$/.test(document))
      return setError("El documento debe ser numérico.");
    if (password.length < 6)
      return setError("La contraseña debe tener al menos 6 caracteres.");

    setError("");

    try {
      const url = `${API_URL}/api/auth/login`;
      const res = await axios.post(url, {
        tipoCuenta: typeAccount,
        documento: document,
        password
      });

      const usuario = res.data.usuario;

      localStorage.setItem("rol", usuario.rol);
      localStorage.setItem("usuarioId", usuario.id);
      localStorage.setItem(
        "usuario",
        JSON.stringify({
          tipoCuenta: typeAccount,
          documento: document,
          password
        })
      );

      Swal.fire({
        position: "top",
        icon: "success",
        title: "Inicio exitoso",
        showConfirmButton: false,
        timer: 1200,
        toast: true
      });

      navigate("/inicio");
    } catch (err) {
      console.error("error login", err.response);
      const message = err.response?.data?.message || "Error al iniciar sesión";
      setError(message);
    }
  };

  return (
    <div className="login-section">
      <div className="login">
        {/* <h3 id="login-title">Ingreso Seguimiento</h3> */}

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="label login-label" htmlFor="login-select">
            Tipo de Cuenta
          </label>
          <select
            className="input login-input"
            id="login-select"
            name="typeAccount"
            value={typeAccount}
            onChange={(e) => setTypeAccount(e.target.value)}
            required>
            <option disabled value="">
              Seleccione su tipo de cuenta
            </option>
            <option value="instructor">Instructor</option>
            <option value="aprendiz">Aprendiz</option>
          </select>

          <label className="label login-label" htmlFor="login-document">
            Número de Documento
          </label>
          <input
            className="input login-input"
            id="login-document"
            type="text"
            placeholder="Ingrese su documento"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            autoComplete="off"
            autoSave="off"
            required
          />

          <label className="label login-label" htmlFor="login-password">
            Contraseña
          </label>
          <input
            type="password"
            className="input login-input"
            id="login-password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoSave="on"
            required
          />

          {error && (
            <p className="error-message" role="alert">
              <span role="img" aria-label="error">
                ⚠️
              </span>
              {error}
              <button
                onClick={() => setError(null)}
                className="close-button"
                aria-label="cerrar alerta">
                ✖
              </button>
            </p>
          )}

          <div className="recovery-block">
            <Link to="/forgot-password">Olvidé mi contraseña</Link>
            <Link to="/registro">Registrarme</Link>
          </div>

          <button type="submit" className="button login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;