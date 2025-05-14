import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { API_URL } from "../../api/globalVars";
import axios from 'axios';

const BitacoraForm = ({ onAddBitacora, bitacoras }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [bitacora, setBitacora] = useState({
    usuarioId: '',
    fecha: '',
    archivo: null,
  });
  const [rol, setRol] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const url = `${API_URL}/api/bitacoras`;

  useEffect(() => {
    const rolGuardado = localStorage.getItem('rol');
    const idGuardado = localStorage.getItem('usuarioId');
    if (rolGuardado) {
      setRol(rolGuardado.toLowerCase());
    }
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

    if (!bitacora.id_usuario || !bitacora.fecha || !bitacora.archivo) {
      alert('Completa todos los campos.');
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

      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Error al subir la bitácora.');
      }

      const data = await res.json();

      if (data.bitacora) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Bitácora subida exitosamente",
          showConfirmButton: false,
          timer: 1200,
          toast: true,
        });
        setIsFormVisible(false);
        setBitacora({ id_usuario: bitacora.id_usuario, fecha: '', archivo: null });
        onAddBitacora();

        // Crear la notificación para el instructor (o para quien corresponda)
        await crearNotificacion(data.bitacora);
      } else {
        console.log('Ocurrió un error inesperado');
      }
    } catch (error) {
      console.error('Error al subir la bitácora:', error);
    }
  };

  const crearNotificacion = async (bitacora) => {
    const usuarioId = localStorage.getItem('usuarioId');
    const mensaje = `El aprendiz ha subido una nueva bitácora con fecha ${bitacora.fecha}`;
    const estado = 'pendiente'; // La notificación estará pendiente
    const tipo = 'Bitácora';  // Tipo de notificación

    try {
      await axios.post(`${API_URL}/api/notificaciones`, {
        mensaje,
        usuarioId,  // El instructor debe recibir la notificación
        estado,
        tipo,
      });

      // Notificar a otros componentes de que las notificaciones han sido actualizadas
      window.dispatchEvent(new Event("notificacionesActualizadas"));
    } catch (error) {
      console.error('Error al crear la notificación:', error);
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
      <button className="button register-button" onClick={toggleForm}>Agregar Bitácora</button>
      {isFormVisible && (
        <section className="bitacora-form">
          <h2 className="bitacora-form__title">Agregar Bitácora</h2>

          <input
            type="file"
            name="archivo"
            className="input report-input"
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="fecha"
            className="input visit-input"
            value={bitacora.fecha}
            onChange={handleChange}
            max={today}
            required
          />

          <button
            type="submit"
            className="button register-button"
            disabled={bitacoras.length >= 6}
          >
            {bitacoras.length >= 6 ? 'Has alcanzado el límite de 6 bitácoras' : 'Subir Bitácora'}
          </button>
        </section>
      )}
    </form>
  );
};

export default BitacoraForm;
