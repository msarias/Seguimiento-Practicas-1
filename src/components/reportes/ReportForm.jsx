import React, { useState } from 'react';
import axios from 'axios';

const ReportForm = ({ onAddReporte, onClose }) => {
    const [reporte, setReporte] = useState({
      id_usuario: '',
      nombre: '',
      motivo: '',
      fecha: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setReporte({ ...reporte, [name]: value });
    };

    const uploadReport = async (e) => {
      if (
        !reporte.id_usuario ||
        !reporte.nombre ||
        !reporte.motivo ||
        !reporte.fecha
      ) {
        alert('Por favor, completa todos los campos.');
        return;
      }
    
      try {
        const response = await axios.post('http://localhost:3000/api/reportes/', reporte, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.data.reportes && response.data.reportes.length > 0) {
          onAddReporte(response.data.reportes);
          alert('¡Reporte subido exitosamente!');
          onClose();
          setReporte({ id_usuario: '', nombre: '', motivo: '', fecha: '' });
        } else {
          console.error('No se recibió correctamente la información.');
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error al subir el reporte:', error.message);
      }
    };
    
  const handleSubmit = (e) => {
    e.preventDefault();
    uploadReport(); // Llamamos a la función que realiza el POST
  };

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <h2 className="report-form__title">Agregar Reporte</h2>
      <input
        type="number"
        name="id_usuario"
        placeholder="ID usuario"
        className="report-form__input"
        value={reporte.id_usuario}
        onChange={handleChange}
      />
      <input
        type="text"
        name="nombre"
        placeholder="Nombre del reporte"
        className="report-form__input"
        value={reporte.nombre}
        onChange={handleChange}
      />
      <input
        type="text"
        name="motivo"
        placeholder="Motivo del reporte"
        className="report-form__input"
        value={reporte.motivo}
        onChange={handleChange}
      />
      <input
        type="date"
        name="fecha"
        className="report-form__input"
        value={reporte.fecha}
        onChange={handleChange}
      />
      <button type="submit" className="report-form__button">
        Subir Reporte
      </button>
    </form>
  );
};

export default ReportForm;