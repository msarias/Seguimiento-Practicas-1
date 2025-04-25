import React, { useState, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";

const BitacoraForm = ({ onAddBitacora, onClose }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [bitacora, setBitacora] = useState({

    id_usuario: "",
    fecha: new Date().toISOString().slice(0, 10),
    // archivo: '',
    codigo: "",
  });
  const [rol, setRol] = useState('');

  useEffect(() => {
    const rolGuardado = localStorage.getItem('rol');
    if (rolGuardado) {
      setRol(rolGuardado.toLowerCase());
    }
  }, []);

  const toggleForm = (e) => {
    e.preventDefault();
    setIsFormVisible(!isFormVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const subirBitacora = async () => {
    if (!bitacora.fecha) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, completa todos los campos.",
        toast: true,
        backdrop: true,
      });
      // alert("Completa todos los campos.");
      return;
    }

    try {
      const url = "http://localhost:3000/api/bitacoras";
      const res = await axios.post(url, bitacora, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data;

      if (data.bitacora) {
        alert("¡Bitácora subida exitosamente!");
        toggleForm();
        setBitacora({ fecha: "" });
        onAddBitacora(bitacora);
      } else {

        console.error("Ocurrió un error");
        console.log('Ocurrió un error');

      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBitacora({
      ...bitacora,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button className="add-bitacora" onClick={toggleForm}>
        Agregar Bitácora
      </button>
      {isFormVisible && (
        <section className="bitacora-form" id="bitacoraForm">
          <h2 className="bitacora-form__title">Agregar Bitácora</h2>
          <input
            type="text"
            name="codigo"
            className="bitacora-form__input"
            placeholder="Número de la bitácora"
            value={bitacora.codigo}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            name="archivo"
            className="bitacora-form__input"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bitacora-form__button"
            onClick={subirBitacora}
          >
            Subir Bitácora
          </button>
        </section>
      )}
    </form>
  );
};

export default BitacoraForm;
