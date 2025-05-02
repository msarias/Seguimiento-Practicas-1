import React, { useState } from "react";
import axios from "axios";
import React, { useState, useEffect } from 'react';

<<<<<<< HEAD

const BitacoraForm = ({ onAddBitacora, onClose }) => {
=======
const BitacoraForm = ({ onAddBitacora, onClose, bitacoras }) => {
>>>>>>> yefferson
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [bitacora, setBitacora] = useState({

    id_usuario: "",
    fecha: "",
    // archivo: '',
    codigo: "",
    id_usuario: '',
    fecha: '',
<<<<<<< HEAD
    codigo: '',

=======
    archivo: null,
>>>>>>> yefferson
  });
  const [rol, setRol] = useState('');
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const rolGuardado = localStorage.getItem('rol');
    const idGuardado = localStorage.getItem('id');
    console.log('ID guardado:', idGuardado); // <-- Añadí esto
  
    if (rolGuardado) setRol(rolGuardado.toLowerCase());
    if (idGuardado) {
      setBitacora((prev) => ({ ...prev, id_usuario: idGuardado }));
    }
  }, []);

  const toggleForm = (e) => {
    e.preventDefault();
    setIsFormVisible(!isFormVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
  const subirBitacora = async () => {
    if (!bitacora.codigo || !bitacora.id_usuario || !bitacora.fecha) {
      alert("Completa todos los campos.");
=======
    if (!bitacora.id_usuario || !bitacora.fecha || !bitacora.archivo) {
      alert('Completa todos los campos.');
>>>>>>> yefferson
      return;
    }

    if (bitacora.fecha !== today) {
      alert('Solo puedes subir la bitácora con la fecha actual.');
      return;
    }

    if (bitacoras.length >= 6) {
      alert('Ya has subido el máximo de 6 bitácoras.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('id_usuario', bitacora.id_usuario);
      formData.append('fecha', bitacora.fecha);
      formData.append('archivo', bitacora.archivo);

    try {
      const res = await fetch('http://localhost:3000/api/bitacoras/', {
        method: 'POST',
        body: formData,
>>>>>>> yefferson
      });

      const data = res.data;

      if (data.bitacora) {
<<<<<<< HEAD
        alert("¡Bitácora subida exitosamente!");
        toggleForm();
        setBitacora({ codigo: "", id_usuario: "", fecha: "" });
        onAddBitacora(bitacora);
      } else {

        console.error("Ocurrió un error");
        console.log('Ocurrió un error');

=======
        alert('¡Bitácora subida exitosamente!');
        setIsFormVisible(false);
        const idGuardado = localStorage.getItem('id');
        setBitacora({ id_usuario: idGuardado || '', fecha: '', archivo: null });
        onAddBitacora(data.bitacora);
      } else {
        console.log('Ocurrió un error inesperado');
>>>>>>> yefferson
      }
    } catch (error) {
      console.console.log(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setBitacora({
      ...bitacora,
      [name]: name === 'archivo' ? files[0] : value,
    });
  };

  if (rol !== 'aprendiz') return null;

  return (
    <form onSubmit={handleSubmit}>
      <button className="add-bitacora" onClick={toggleForm}>
        Agregar Bitácora
      </button>
      {isFormVisible && (
        <section className="bitacora-form" id="bitacoraForm">
          <h2 className="bitacora-form__title">Agregar Bitácora</h2>

          {/* <input
            type="text"
            name="id_usuario"
            className="bitacora-form__input"
            placeholder="ID del usuario"
            value={bitacora.id_usuario}
            onChange={handleChange}
            required
          /> */}

          <input
            type="file"
            name="archivo"
            className="bitacora-form__input"
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="fecha"
            className="bitacora-form__input"
            value={bitacora.fecha}
            onChange={handleChange}
            max={today}
            required
          />

          <button
            type="submit"
            className="bitacora-form__button"
            disabled={bitacoras.length >= 6} // Deshabilitar el botón si ya se subieron 6 bitácoras
          >
            {bitacoras.length >= 6 ? 'Has alcanzado el límite de 6 bitácoras' : 'Subir Bitácora'}
          </button>
        </section>
      )}
    </form>
  );
};

export default BitacoraForm;
