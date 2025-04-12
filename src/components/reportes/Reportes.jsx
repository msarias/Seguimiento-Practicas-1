import React, { useState, useEffect } from 'react';
import NavBar from '../generales/NavBar';
import Sidebar from '../generales/Sidebar';
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
    if (!reporte.id_usuario || !reporte.nombre || !reporte.motivo || !reporte.fecha) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/reportes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reporte),
      });

      if (!response.ok) throw new Error('Error al subir el reporte.');

      const data = await response.json();
      if (data.nuevoReporte) {
        onAddReporte(data.nuevoReporte); // Recibe el nuevo reporte directamente
        setReporte({ id_usuario: '', nombre: '', motivo: '', fecha: '' });
      } /* else {
        console.error('No se recibió correctamente la información.');
      } */
    } catch (error) {
      console.error('Error al subir el reporte:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadReport(); // Llamamos a la función que realiza el POST
  };

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <h2 className="report-form__title">Agregar Reporte</h2>
      <input type="number" name="id_usuario" placeholder="ID usuario" className="report-form__input" value={reporte.id_usuario} onChange={handleChange} />
      <input type="text" name="nombre" placeholder="Nombre del reporte" className="report-form__input" value={reporte.nombre} onChange={handleChange} />
      <input type="text" name="motivo" placeholder="Motivo del reporte" className="report-form__input" value={reporte.motivo} onChange={handleChange} />
      <input type="date" name="fecha" className="report-form__input" value={reporte.fecha} onChange={handleChange} />
      <button type="submit" className="report-form__button">Subir Reporte</button>
    </form>
  );
};

const Reportes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [reportes, setReportes] = useState([]);

  const obtenerReportes = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/reportes/verReportes');
      if (!response.ok) throw new Error('Error al obtener reportes');
      const data = await response.json();
      setReportes(data.reportes || []);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    obtenerReportes();
  }, []);

  const toggleForm = () => setMostrarFormulario(!mostrarFormulario);

  const agregarReporte = (nuevoReporte) => {
    setReportes((prev) => [...prev, nuevoReporte]);
  };

  const deleteReport = async (e) => {
    const id = e.target.id;
    try {
      const response = await fetch(`http://localhost:3000/api/reportes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('No se pudo eliminar el reporte.');
      setReportes((prev) => prev.filter((reporte) => reporte.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <Sidebar />
      <div className="content">
        <h2 className="report-list__title">Reportes</h2>

        {reportes.length === 0 ? (
          <p>No existen reportes</p>
        ) : (
          reportes.map((reporte, index) => (
            <div className="report-list__item" key={index}>
              <p>ID Aprendiz: {reporte.id_usuario}</p>
              <p>Nombre: {reporte.nombre}</p>
              <p>Motivo: {reporte.motivo}</p>
              <p>Fecha: {reporte.fecha}</p>
              <button
                id={reporte.id}
                onClick={deleteReport}
                className="report-list__button delete-button"
              >
                <img
                  id="delete-img"
                  src="../css/img/trash.png"
                  alt="Eliminar"
                />
              </button>
            </div>
          ))
        )}

        <button className="add-report report-form__button" onClick={toggleForm}>
          {mostrarFormulario ? 'Cerrar Formulario' : 'Agregar Reporte'}
        </button>

        {mostrarFormulario && (
          <ReportForm onAddReporte={agregarReporte} onClose={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default Reportes;