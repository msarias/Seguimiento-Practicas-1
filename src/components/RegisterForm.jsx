import React, { useState } from "react";
import Swal from "sweetalert2";


const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    id_empresa: "",
    identificacion: "",
    correo: "",
    contraseña: "",
    rol: "aprendiz", // Valor por defecto pero se adapta al cambio de rol
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validaciones básicas
    if (!formData.identificacion.match(/^\d+$/)) {
      setError("El número de documento solo debe contener números.");
      return;
    }

    if (formData.contraseña.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
        timer: 1500
      });

      setFormData({
        nombres: "",
        apellidos: "",
        id_empresa: "",
        identificacion: "",
        correo: "",
        contraseña: "",
        rol: "aprendiz",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2 className="register-title" style={{ color: '#0056b3' }}>Registro Usuarios</h2>
      <form className="form" onStalledCapture={handleSubmit}>
        <label htmlFor="names-input">Nombres</label>
        <input type="text" id="names-input" placeholder="Ingrese sus nombres" required minLength="3" />

        <label htmlFor="lastnames-input">Apellidos</label>
        <input type="text" id="lastnames-input" placeholder="Ingrese sus apellidos" required />

        <label htmlFor="code-input">Número de ficha</label>
        <input type="text" onChange={(e) => setFicha(e.target.value)} value={ficha} id="code-input" placeholder="Ingrese su número de ficha" required />

        <label htmlFor="document-input">Número de documento</label>
        <input type="text" onChange={(e) => setDocument(e.target.value)} value={document} id="document-input" placeholder="Ingrese su documento" required />

        <label htmlFor="email-input">Correo electrónico</label>
        <input type="email" id="email-input" placeholder="Ingrese su correo electrónico" required />

        <label htmlFor="password-input">Contraseña</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} id="password-input" placeholder="Ingrese su contraseña" required />

        {error && <p className="error-message">{error}</p>}

        <div className="log-in">
          <button type="submit" className="register-button">Registrarse</button>
          <a href="./Login">Iniciar Sesión</a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
