import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  // Estados para manejar los valores de los inputs
  const [typeAccount, setTypeAccount] = useState('');
  const [document, setDocument] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Validaciones básicas
    if (!typeAccount) {
      setError('Debe seleccionar un tipo de cuenta.');
      return;
    }

    if (!document.match(/^\d+$/)) {
      setError('El número de documento solo debe contener números.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Si pasa las validaciones, simula el "ingreso"
    setError(''); // Limpia errores
    alert('Inicio de sesión exitoso'); // Simulación de ingreso
  };

  return (
    <div className="login-section">
      <div className="login">
        <h2 id="login-title">Ingreso Seguimiento</h2>
        <form className="login-form" id="login-form" onSubmit={handleSubmit}>
          <label className="login-label">Tipo de Cuenta</label>
          <select
            className="login-input"
            name="typeDocument"
            value={typeAccount}
            onChange={(e) => setTypeAccount(e.target.value)}
          >
            <option disabled>Seleccione su tipo de cuenta</option>
            <option>Instructor</option>
            <option>Aprendiz</option>
          </select>

          <label className="login-label" htmlFor="document-input">
            Número de Documento
          </label>
          <input
            className="login-input"
            id="document-input"
            type="text"
            title="Número de documento"
            placeholder="Ingrese su documento"
            pattern="[0-9]+"
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
            title="Contraseña"
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