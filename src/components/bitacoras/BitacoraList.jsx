import React, { useEffect, useState } from 'react';
import BitacoraForm from './BitacoraForm';

const BitacoraList = () => {
  const [bitacoras, SetBitacoras] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    obtenerBitacoras();
  }, [bitacoras.length]);

  const obtenerBitacoras = async () => {
    try {
      const res = await fetch(
        'http://localhost:3000/api/bitacoras/verBitacoras'
      );
      const data = await res.json();
      if (!res.ok) {
        setError('No se pudieron obtener las bitácoras');
      }
      console.log('data:', { data });
      SetBitacoras(data);
    } catch (error) {}
  };
  const deleteBitacora = async (e) => {
    const id = e.target.id;
    try {
      const res = await fetch(`http://localhost:3000/api/bitacoras/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('No se pudo eliminar la bitácora.');
      }

      const data = await res.json();
      console.log('Bitácora eliminada:', data);
      const updatedBitacoras = bitacoras.filter(
        (bitacora) => bitacora.id !== id
      );

      SetBitacoras(updatedBitacoras);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="bitacora-list">
      <h2 className="bitacora-list__title">Bitácoras</h2>
      {error && <p className="error-message">{error}</p>}
      {bitacoras.length > 0 ? (
        bitacoras.map((b, index) => (
          <div className="report-list__item" key={index}>
            <p>
              <strong>{`Bitácora ${index + 1}`}</strong>
            </p>
            <p>{b.archivo || 'Sin archivo'}</p>
            <p>{b.codigo}</p>
            <p>{b.fecha}</p>
            <button
              id={b.id}
              className="bitacora-list__button delete-button"
              onClick={deleteBitacora}
            >
              <img id="delete-img" src="../css/img/trash.png" alt="Eliminar" />
            </button>
          </div>
        ))
      ) : (
        <p>No hay bitácoras</p>
      )}
      <BitacoraForm />
    </section>
  );
};

export default BitacoraList;