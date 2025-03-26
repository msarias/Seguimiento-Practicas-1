import { useState } from "react";
import { forgotPassword } from "../api/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      alert("Revisa tu correo");
    } catch (error) {
      alert("Error al enviar la solicitud");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Restablecer Contraseña</h2>
      <span>Igrese su correo para restablecimiento de contraseña</span>
      <input
        type="email"
        placeholder="Ingresa tu correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ForgotPassword;
