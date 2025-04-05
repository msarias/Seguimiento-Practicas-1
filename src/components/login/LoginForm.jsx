import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [typeAccount, setTypeAccount] = useState("");
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!typeAccount) {
      setError("Debe seleccionar un tipo de cuenta.");
      return;
    }

    if (!/^\d+$/.test(document)) {
      setError("El número de documento solo debe contener números.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setError("");

    try {
      await axios.post("http://localhost:3000/api/auth/login", {
        tipoCuenta: typeAccount,
        documento: document,
        password,
      });
      navigate("/Inicio");

      // Puedes guardar el token si lo recibes
      // localStorage.setItem("token", response.data.token);

      navigate("/Inicio");
    } catch (err) {
      const message = err.response?.data?.message || "Error al iniciar sesión";
      setError(message);
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-section">
      <div className="login">
        <h2 id="login-title">Ingreso Seguimiento</h2>

        <form className="login-form" id="login-form" onSubmit={handleSubmit}>
          <label className="login-label">Tipo de Cuenta</label>
          <select
            className="login-input"
            name="typeAccount"
            value={typeAccount}
            onChange={(e) => setTypeAccount(e.target.value)}
            required
          >
            <option value="" disabled>
              Seleccione su tipo de cuenta
            </option>
            <option value="instructor">Instructor</option>
            <option value="aprendiz">Aprendiz</option>
          </select>

          <label className="login-label" htmlFor="document-input">
            Número de Documento
          </label>
          <input
            className="login-input"
            id="document-input"
            type="text"
            placeholder="Ingrese su documento"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            required
          />

          <label className="login-label" htmlFor="password-input">
            Contraseña
          </label>
          <input
            id="password-input"
            type="password"
            className="login-input"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="recovery-block">
            <Link to="/forgot-password">Olvidé mi contraseña</Link>
            <Link to="/Register">Registrarme</Link>
            <Link to="/Inicio">Inicio</Link>
          </div>

          {/* Mostrar error si hay */}
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
