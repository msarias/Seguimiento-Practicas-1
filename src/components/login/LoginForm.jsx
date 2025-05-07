import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../../api/globalVars";

const LoginForm = () => {
  const [typeAccount, setTypeAccount] = useState("");
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
        password,
      });

      const usuario = res.data.usuario;
      
      localStorage.setItem("rol", usuario.rol);
      localStorage.setItem("usuarioId", usuario.id);
      localStorage.setItem(
        "usuario",
        JSON.stringify({
          tipoCuenta: typeAccount,
          documento: document,
          password,
        })
      );

      Swal.fire({
        position: "top",
        icon: "success",
        title: "Inicio exitoso",
        showConfirmButton: false,
        timer: 1200,
        toast: true,
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
        <h2 id="login-title">Ingreso Seguimiento</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label" htmlFor="login-select">
            Tipo de Cuenta
          </label>
          <select
            className="login-input"
            id="login-select"
            name="typeAccount"
            value={typeAccount}
            onChange={(e) => setTypeAccount(e.target.value)}
            required
          >
            <option disabled value="">
              Seleccione su tipo de cuenta
            </option>
            <option value="instructor">Instructor</option>
            <option value="aprendiz">Aprendiz</option>
          </select>

          <label className="login-label">Número de Documento</label>
          <input
            className="login-input"
            type="text"
            placeholder="Ingrese su documento"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            autoComplete="off"
            autoSave="off"
            required
          />

          <label className="login-label">Contraseña</label>
          <input
            type="password"
            className="login-input"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoSave="on"
            required
          />

          {error && <p className="error-message">{error}</p>}

          <div className="recovery-block">
            <Link to="/forgot-password">Olvidé mi contraseña</Link>
            <Link to="/registro">Registrarme</Link>
          </div>

          <button type="submit" className="login-button">Iniciar Sesión</button>

        </form>
      </div>
    </div>
  );
};

export default LoginForm;