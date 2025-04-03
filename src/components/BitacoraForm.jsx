import React, { useState } from 'react';
import AddBitacoraButton from './AddBitacoraButton';

const BitacoraForm = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div>
      <AddBitacoraButton toggleForm={toggleForm} />
      {isFormVisible && (
        <section className="bitacora-form" id="bitacoraForm">
          <h2 className="bitacora-form__title">Agregar Bitácora</h2>
          <input
            type="text"
            name="numero-bitacora"
            className="bitacora-form__input"
            placeholder="Número de la bitácora"
            min={1}
            max={6}
          />
          <input
            type="text"
            name="nombre-bitacora"
            className="bitacora-form__input"
            placeholder="Nombre de la bitácora"
          />
          <input
            type="file"
            name="archivo"
            className="bitacora-form__input"
            placeholder="Cargar Archivo"
          />
          <input type="date" name="date" className="bitacora-form__input" />
          <button className="bitacora-form__button">Subir Bitácora</button>
        </section>
      )}
    </div>
  );
};

export default BitacoraForm;
