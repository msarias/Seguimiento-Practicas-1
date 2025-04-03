import React, { useEffect, useState } from 'react';
import BitacoraForm from './BitacoraForm';

const BitacoraList = () => {
  const [bitacoras, SetBitacoras] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerBitacoras = async () => {
      try {
        const res = await fetch(
          'http://localhost:3000/api/bitacoras/verBitacoras'
        );
        const data = await res.json();
        if (res.ok) {
          console.log('data: ', {data});
        }
        SetBitacoras(data);
      } catch (error) {
        setError('No se pudieron obtener las bitácoras');
      }
    };
    obtenerBitacoras();
  }, [bitacoras.length]);

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
            <p>{b.archivo}</p>
            <p>{b.codigo}</p>
            <p>{b.fecha}</p>
            <button className="bitacora-list__button">Ver</button>
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
