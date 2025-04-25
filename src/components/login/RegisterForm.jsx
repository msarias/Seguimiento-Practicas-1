import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const [fichas, setFichas] = useState([]);

  const getFichas = async () => {
    try {
      const url = "http://localhost:3000/api/fichas/";
      const response = await axios.get(url);
      const data = response.data;
      setFichas(data || []);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFichas();
  }, [fichas]);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*if (!formData.identificacion.match(/^\d+$/)) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El número de documento solo debe contener números.",
      toast: true,
    });
    return;
  }
  if (password.length < 6) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "La contraseña debe tener al menos 6 caracteres.",
      toast: true,
    });
    return;
  }
     */
    try {
      await axios.post("http://localhost:3000/api/usuarios", {
        ...formData,
        contraseña: password,
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuario registrado con éxito",
        showConfirmButton: false,
        timer: 1200,
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
      const message =
        err.response?.data?.message || "Error al registrar usuario";
      console.log(err.response);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
        toast: true,
        position: "center",
      });
    }
  };

  return (
    <div className="form-container">
      <h2 className="register-title">Registro Usuarios</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="names-input" className="register-label">
          Nombres
        </label>
        <input
          type="text"
          id="names-input"
          className="register-input"
          name="nombres"
          value={formData.nombres}
          onChange={(e) => {
            console.log(e.target.value);
            console.log(e.target.validity);
          }}
          placeholder="Ingrese sus nombres"
          // required
          minLength={3}
          maxLength={45}
          pattern="[A-Za-z\s]+"
          onInvalid={(e) => {
            if (e.target.validity.valueMissing) {
              e.target.setCustomValidity("Este campo es obligatorio.");
            } else if (e.target.validity.tooShort) {
            /* else if(e.target.validity.patternMismatch) {
              e.target.setCustomValidity("El nombre solo debe contener letras y espacios.");
            }  */
              e.target.setCustomValidity(
                "El nombre debe tener al menos 3 caracteres."
              );
            } else if (e.target.validity.tooLong) {
              e.target.setCustomValidity(
                "El nombre no puede exceder los 45 caracteres."
              );
            }
          }}
          onInput={(e) => e.target.setCustomValidity("")}
        />

        <label htmlFor="lastnames-input" className="register-label">
          Apellidos
        </label>
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

        <label htmlFor="code-input" className="register-label">
          Número de ficha
        </label>
        <select
          className="register-input"
          id="code-input"
          name="ficha"
          onChange={handleChange}
          required
        >
          {fichas.length > 0 ? (
            fichas.map((ficha) => (
              <option key={ficha.id} value={ficha.codigo}>
                {ficha.codigo}
              </option>
            ))
          ) : (
            <option value="">No hay fichas disponibles</option>
          )}
        </select>

        <label htmlFor="document-input" className="register-label">
          Número de documento
        </label>
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

        <label htmlFor="email-input" className="register-label">
          Correo electrónico
        </label>
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

        <label htmlFor="password-input" className="register-label">
          Contraseña
        </label>
        <input
          type="password"
          id="password-input"
          className="register-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
          required
        />

        <div className="log-in">
          <button type="submit" className="register-button">
            Registrarse
          </button>
          <Link to={"/"}>
            <p>Iniciar Sesión</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;