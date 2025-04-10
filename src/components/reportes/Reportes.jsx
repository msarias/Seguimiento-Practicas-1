import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../generales/NavBar';
import Sidebar from '../generales/Sidebar';
import ReportForm from './ReportForm';

// Componente Reportes
const Reportes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [reportes, setReportes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerReportes = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/reportes/verReportes'
        );
        const data = response.data;
        setReportes(data.reportes || []);
      } catch (error) {
        if (error.response && reportes.length > 0) {
          setError('No se pudieron obtener los reportes.');
        } else {
          console.log(error.response.data);
        }
      }
    };
    obtenerReportes();
  }, []);

  const toggleForm = () => setMostrarFormulario(!mostrarFormulario);

  const agregarReporte = (nuevoReporte) => {
    setReportes([...reportes, nuevoReporte]);
  };

  const deleteReport = async (e) => {
    const id = e.target.id;
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/reportes/${id}`
      );

      console.log('Reporte eliminado:', response.data);

      const updatedReports = reportes.filter((reporte) => reporte.id !== id);
      setReportes(updatedReports);
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <Sidebar />
      <div className="content">
        <h2 className="report-list__title">Reportes</h2>
        {error && <p className="error-message">{error}</p>}
        {reportes.length > 0 ? (
          reportes.map((reporte, index) => (
            <div className="report-list__item" key={index}>
              <p>
                <strong>{`Reporte ${index + 1}`}</strong>
              </p>
              <p>{reporte.nombre}</p>
              <p>{reporte.motivo || 'No se agregó un motivo'}</p>
              <button
                id={reporte.id}
                onClick={() => {
                  console.log(reporte.id);
                }}
                className="report-list__button delete-button"
              >
                <img
                  id="delete-img"
                  src="../css/img/edit.png"
                  alt="Modificar"
                />
              </button>
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
        ) : (
          <p>No hay reportes disponibles.</p>
        )}
        <button className="add-report" onClick={toggleForm}>
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