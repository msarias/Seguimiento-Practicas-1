import React from 'react';
import { useState } from 'react';


const RegisterForm = () => {
  // Estados para manejar los valores de los inputs
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const [ficha, setFicha] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Validaciones básicas
    if (!document.match(/^\d+$/)) {
      setError("El número de documento solo debe contener números.");
      return;
    }
    
    if(!ficha.match(/^\d+$/)) {
      setError("La ficha solo debe contener números.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    
    // Si pasa las validaciones, simula el "ingreso"
    setError(""); // Limpia errores
    alert("Inicio de sesión exitoso"); // Simulación de ingreso
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