import React, { useState } from "react";
import axios from "axios";

const BitacoraForm = ({ onAddBitacora, onClose }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [bitacora, setBitacora] = useState({
    id_usuario: "",
    fecha: "",
    // archivo: '',
    codigo: "",
  });

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const subirBitacora = async () => {
    if (!bitacora.codigo || !bitacora.id_usuario || !bitacora.fecha) {
      alert("Completa todos los campos.");
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
        setBitacora({ codigo: "", id_usuario: "", fecha: "" });
        onAddBitacora(bitacora);
      } else {
        console.error("Ocurrió un error");
      }
    } catch (error) {
      console.console.log(error.message);
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
            type="text"
            name="id_usuario"
            className="bitacora-form__input"
            placeholder="ID del usuario"
            value={bitacora.id_usuario}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            name="archivo"
            className="bitacora-form__input"
            onChange={handleChange}
            // required
          />

          <input
            type="date"
            name="fecha"
            className="bitacora-form__input"
            value={bitacora.fecha}
            onChange={handleChange}
            required
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