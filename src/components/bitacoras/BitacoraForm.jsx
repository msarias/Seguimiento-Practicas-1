import React, { useState, useEffect } from 'react';

const BitacoraForm = ({ onAddBitacora, onClose }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [bitacora, setBitacora] = useState({
    id_usuario: '',
    fecha: '',
    codigo: '',
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
    if (!bitacora.codigo || !bitacora.id_usuario || !bitacora.fecha) {
      alert('Completa todos los campos.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/bitacoras/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bitacora),
      });

      if (!res.ok) {
        throw new Error('Error al subir la bitácora.');
      }

      const data = await res.json();

      if (data.bitacora) {
        alert('¡Bitácora subida exitosamente!');
        toggleForm();
        setBitacora({ codigo: '', id_usuario: '', fecha: '' });
        onAddBitacora(bitacora);
      } else {
        console.log('Ocurrió un error');
      }
    } catch (error) {
      console.error('Error al subir la bitácora:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBitacora({
      ...bitacora,
      [name]: value,
    });
  };

  if (rol !== 'aprendiz') return null; // 🔒 Oculta todo para otros roles

  return (
    <form onSubmit={handleSubmit}>
      <button className="add-bitacora" onClick={toggleForm}>Agregar Bitácora</button>
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
