import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    id_empresa: "",
    identificacion: "",
    ficha: "",
    correo: "",
    rol: "aprendiz",
  });

  const [password, setPassword] = useState(""); // Contraseña por separado
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.identificacion.match(/^\d+$/)) {
      setError("El número de documento solo debe contener números.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, contraseña: password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al registrar usuario");
      }

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuario registrado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });

      setFormData({
        nombres: "",
        apellidos: "",
        id_empresa: "",
        identificacion: "",
        ficha: "",
        correo: "",
        rol: "aprendiz",
      });
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2 className="register-title">Registro Usuarios</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="names-input" className="register-label">Nombres</label>
        <input
          type="text"
          id="names-input"
          className="register-input"
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
          placeholder="Ingrese sus nombres"
          required
          minLength="3"
        />

        <label htmlFor="lastnames-input" className="register-label">Apellidos</label>
        <input
          type="text"
          id="lastnames-input"
          className="register-input"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          placeholder="Ingrese sus apellidos"
          required
        />

        <label htmlFor="code-input" className="register-label">Número de ficha</label>
        <input
          type="text"
          id="code-input"
          className="register-input"
          name="ficha"
          value={formData.ficha}
          onChange={handleChange}
          placeholder="Ingrese su número de ficha"
          required
        />

        <label htmlFor="document-input" className="register-label">Número de documento</label>
        <input
          type="text"
          id="document-input"
          className="register-input"
          name="identificacion"
          value={formData.identificacion}
          onChange={handleChange}
          placeholder="Ingrese su documento"
          required
        />

        <label htmlFor="email-input" className="register-label">Correo electrónico</label>
        <input
          type="email"
          id="email-input"
          className="register-input"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          placeholder="Ingrese su correo electrónico"
          required
        />

        <label htmlFor="password-input" className="register-label">Contraseña</label>
        <input
          type="password"
          id="password-input"
          className="register-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
          required
        />

        {error && <p className="error-message">{error}</p>}

        <div className="log-in">
          <button type="submit" className="register-button">Registrarse</button>
          <Link to={"/"}>
            <p>Iniciar Sesión</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
