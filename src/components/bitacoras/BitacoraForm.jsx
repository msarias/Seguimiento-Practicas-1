import React, { useState } from 'react';
import AddBitacoraButton from './AddBitacoraButton';

const BitacoraForm = ({ onAddBitacora, onClose }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [bitacora, setBitacora] = useState({
    id_usuario: '',
    fecha: '',
    archivo: null,
    codigo: '',
  });

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    subirBitacora(); // Realiza el POST al backend
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'archivo') {
      setBitacora({ ...bitacora, archivo: files[0] }); // Guardamos el archivo (File)
    } else {
      setBitacora({ ...bitacora, [name]: value }); // Guardamos campos normales
    }
  };

  const subirBitacora = async () => {
    try {
      const formData = new FormData();
      formData.append('id_usuario', bitacora.id_usuario);
      formData.append('fecha', bitacora.fecha);
      formData.append('archivo', bitacora.archivo);
      formData.append('codigo', bitacora.codigo);

      const res = await fetch('http://localhost:3000/api/bitacoras/', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data)
        console.log(res.error)
        alert(data.message || 'Error al subir la bitácora');
      } else {
        onAddBitacora(formData); // Puedes cambiar esto según la estructura de tu respuesta
        alert('¡Bitácora subida exitosamente!');
        onClose(); // Cierra el formulario
      }
    } catch (error) {
      console.error('Error al subir la bitácora:', error);
      alert('Ocurrió un error al enviar la bitácora.');
    }
  };

  return (
    <form onSubmit={subirBitacora}>
      <AddBitacoraButton toggleForm={toggleForm} />
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
            onSubmit={subirBitacora}
          >
            Subir Bitácora
          </button>
        </section>
      )}
    </form>
  );
};

export default BitacoraForm;