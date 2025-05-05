import React, { useEffect, useState } from 'react';
import BitacoraForm from './BitacoraForm';
import axios from 'axios';

const BitacoraList = () => {
  const [bitacoras, setBitacoras] = useState([]);
  const [error, setError] = useState('');
  const [rol, setRol] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const [mostrarMotivoPopup, setMostrarMotivoPopup] = useState(false);
  const [motivoRechazo, setMotivoRechazo] = useState('');
  const [bitacoraRechazar, setBitacoraRechazar] = useState(null);

  useEffect(() => {
    const rolGuardado = localStorage.getItem('rol');
    const idGuardado = localStorage.getItem('usuarioId');  // Tomamos el id del usuario logueado
    if (rolGuardado) {
      setRol(rolGuardado.toLowerCase());
    }
    if (idGuardado) {
      setIdUsuario(idGuardado);
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

  const renderArchivo = (archivo) => {
    const fileUrl = `http://localhost:3000/uploads/${archivo}`;
    return (
      <a href={fileUrl} target="_blank" rel="noopener noreferrer">
        Ver archivo
      </a>
    );
  };

  // Filtrado: solo mostrar las propias bitácoras si es aprendiz
  const bitacorasFiltradas = rol === 'aprendiz'
    ? bitacoras.filter((b) => b.id_usuario === Number(idUsuario))
    : bitacoras;

  return (
    <section className="bitacora-list">
      <h2 className="bitacora-list__title">Bitácoras</h2>
      {error && <p className="error-message">{error}</p>}
      {bitacorasFiltradas.length > 0 ? (
        bitacorasFiltradas.map((b, index) => (
          <div className={`report-list__item estado${b.estado}`} key={b.id}>
            <p><strong>Bitácora {index + 1}</strong></p>
            {b.archivo ? (
              renderArchivo(b.archivo)
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
      {rol === 'aprendiz' && (
        <BitacoraForm bitacoras={bitacorasFiltradas} onAddBitacora={obtenerBitacoras} />
      )}

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
