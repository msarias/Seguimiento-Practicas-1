import React, { useEffect, useState } from 'react';
import BitacoraForm from './BitacoraForm';
import axios from 'axios';

const BitacoraList = () => {
  const [bitacoras, setBitacoras] = useState([]);
  const [error, setError] = useState('');
  const [rol, setRol] = useState('');
  const [mostrarMotivoPopup, setMostrarMotivoPopup] = useState(false);
  const [motivoRechazo, setMotivoRechazo] = useState('');
  const [bitacoraRechazar, setBitacoraRechazar] = useState(null);

  useEffect(() => {
    const rolGuardado = localStorage.getItem('rol');
    if (rolGuardado) {
      setRol(rolGuardado.toLowerCase());
    }
    obtenerBitacoras();
  }, []);

  const obtenerBitacoras = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/bitacoras/verBitacoras');
      const data = await res.json();
      if (!res.ok) {
        setError('No se pudieron obtener las bitácoras');
      }
      setBitacoras(data);
    } catch (error) {
      setError('Error al obtener bitácoras');
    }
  };

  const handleAceptar = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/bitacoras/aceptar/${id}`);
      obtenerBitacoras();
    } catch (error) {
      console.error('Error al aceptar bitácora:', error);
    }
  };

  const handleRechazar = (bitacora) => {
    setBitacoraRechazar(bitacora);
    setMostrarMotivoPopup(true);
  };

  const confirmarRechazo = async () => {
    try {
      await axios.put(`http://localhost:3000/api/bitacoras/rechazar/${bitacoraRechazar.id}`,
        { motivo: motivoRechazo },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];
      const nuevaNotificacion = {
        id: Date.now(),
        mensaje: `Tu bitácora ${bitacoraRechazar.codigo} fue rechazada. Motivo: ${motivoRechazo}`,
        estado: 'pendiente',
      };
      localStorage.setItem('notificaciones', JSON.stringify([...notificaciones, nuevaNotificacion]));

      setMostrarMotivoPopup(false);
      setMotivoRechazo('');
      setBitacoraRechazar(null);
      obtenerBitacoras();
    } catch (error) {
      console.error('Error al rechazar bitácora:', error);
    }
  };

  return (
    <section className="bitacora-list">
      <h2 className="bitacora-list__title">Bitácoras</h2>
      {error && <p className="error-message">{error}</p>}
      {bitacoras.length > 0 ? (
        bitacoras.map((b, index) => (
          <div className={`report-list__item estado${b.estado}`} key={b.id}>
            <p><strong>Bitácora {index + 1}</strong></p>
            {b.archivo ? (
              <a
                href={`http://localhost:3000/${b.archivo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="archivo-link"
              >
                Ver archivo
              </a>
            ) : (
              <p>Sin archivo</p>
            )}
            <p>{b.codigo}</p>
            <p>{b.fecha}</p>
            {rol === 'instructor' && (
              <div className="bitacora-buttons">
                <button className="bitacora-list__button accept" onClick={() => handleAceptar(b.id)}>✔️</button>
                <button className="bitacora-list__button reject" onClick={() => handleRechazar(b)}>❌</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No hay bitácoras</p>
      )}
      {rol === 'aprendiz' && <BitacoraForm bitacoras={bitacoras} onAddBitacora={obtenerBitacoras} />}

      {mostrarMotivoPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Motivo del rechazo</h3>
            <textarea
              value={motivoRechazo}
              onChange={(e) => setMotivoRechazo(e.target.value)}
              placeholder="Escribe el motivo del rechazo..."
              className="popup-textarea"
            />
            <div className="popup-buttons">
              <button onClick={confirmarRechazo} className="popup-confirm">Confirmar</button>
              <button onClick={() => setMostrarMotivoPopup(false)} className="popup-cancel">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BitacoraList;
