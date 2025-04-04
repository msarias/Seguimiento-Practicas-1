import React, { useState } from 'react';
import AddBitacoraButton from './AddBitacoraButton';

const BitacoraForm = ({ onAddBitacora, onClose }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [bitacora, setBitacora] = useState({
    id_usuario: '',
    fecha: '',
    archivo: '',
    codigo: '',
  });

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    subirBitacora(); // Llamamos a la función que realiza el POST
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBitacora({ ...bitacora, [name]: value });
  };

  const subirBitacora = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/bitacoras/', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(bitacora),
      });

      if (res.ok) {
        console.log('Error');
      }

      const data = await res.json();

      if (data.bitacora) {
        onAddBitacora(data.bitacora); // Llamamos a la función del componente padre para agregar el reporte
        alert('¡Reporte subido exitosamente!');
        onClose(); // Cerramos el formulario
        setBitacora({ id_usuario: '', fecha: '', archivo: '', codigo: '' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AddBitacoraButton toggleForm={toggleForm} />
      {isFormVisible && (
        <section className="bitacora-form" id="bitacoraForm">
          <h2 className="bitacora-form__title">Agregar Bitácora</h2>

          {/* Campo para el número de bitácora */}
          <input
            type="text"
            name="codigo" // Cambié 'numero-bitacora' a 'codigo' para que coincida con el estado
            className="bitacora-form__input"
            placeholder="Número de la bitácora"
            value={bitacora.codigo} // Vincula el valor al estado
            onChange={handleChange}
          />

          {/* Campo para el nombre del usuario o propietario de la bitácora */}
          <input
            type="text"
            name="id_usuario" // Cambié 'nombre-bitacora' a 'id_usuario' para que coincida con el estado
            className="bitacora-form__input"
            placeholder="Nombre de la bitácora"
            value={bitacora.id_usuario} // Vincula el valor al estado
            onChange={handleChange}
          />

          {/* Campo para cargar archivo */}
          <input
            type="file"
            name="archivo"
            className="bitacora-form__input"
            value={bitacora.archivo}
            onChange={handleChange} // Aquí solo necesitas el nombre para cambiar el archivo
          />

          {/* Campo de fecha */}
          <input
            type="date"
            name="fecha" // El nombre debe coincidir con el estado
            className="bitacora-form__input"
            value={bitacora.fecha} // Vincula el valor al estado
            onChange={handleChange}
          />

          <button
            type="submit"
            onAddBitacora={subirBitacora}
            className="bitacora-form__button"
          >
            Subir Bitácora
          </button>
        </section>
      )}
    </form>
  );
};

export default BitacoraForm;