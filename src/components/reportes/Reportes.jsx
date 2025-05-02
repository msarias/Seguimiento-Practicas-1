import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../generales/NavBar';
import Sidebar from '../generales/Sidebar';
import ReportForm from './ReportForm';
import { API_URL } from '../../api/globalVars';

const Reportes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [reportes, setReportes] = useState([]);
  const [rol, setRol] = useState('');

  useEffect(() => {
    const rolGuardado = localStorage.getItem('rol');
    if (rolGuardado) {
      setRol(rolGuardado.toLowerCase());
    }
    obtenerReportes();
  }, []);

  const obtenerReportes = async () => {
    try {
      const url = `${API_URL}/api/reportes/listarReportes`;
      const { data } = await axios.get(url);
      setReportes(data.reportes || []);
    } catch (error) {
      console.error('Error al obtener reportes:', error.message);
    }
  };

  const toggleForm = () => setMostrarFormulario(!mostrarFormulario);

  const agregarReporte = (nuevoReporte) => {
    setReportes((prev) => [...prev, nuevoReporte]);
  };

  const deleteReport = async (e) => {
    const id = e.target.id;
    try {
      const url = `${API_URL}/api/reportes/${id}`;
      const data = await axios.delete(url);
      console.log("Reporte eliminado:", data);

      const updatedReports = reportes.filter((reporte) => reporte.id !== id);
      setReportes(updatedReports);
      alert("¡Reporte eliminado exitosamente!");
    } catch (error) {
      console.error("Error al eliminar el reporte:", error);
      alert("Ocurrió un error al intentar eliminar el reporte.");
    }
  };

  return (
    <div className="container">
      <NavBar />
      <Sidebar />
      <div className="content">
        <h2 className="report-list__title">Reportes</h2>
        {error && <p className="error-message">{error}</p>}

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

        {rol === 'instructor' && (
          <>
            <button className="add-report" onClick={toggleForm}>
              {mostrarFormulario ? 'Cerrar Formulario' : 'Agregar Reporte'}
            </button>

            {mostrarFormulario && (
              <ReportForm onAddReporte={agregarReporte} onClose={toggleForm} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Reportes;
