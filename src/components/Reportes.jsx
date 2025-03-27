import React, { useEffect, useState } from 'react';
import NavBar from './NavBar'; // Importa tu componente Navbar existente
import Sidebar from './Sidebar'; // Importa tu componente Sidebar existente

const ReportForm = ({ onAddReporte, onClose }) => {
  const [reporte, setReporte] = useState({
    archivo: null,
    nombre: '',
    numero: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'archivo') {
      setReporte({ ...reporte, archivo: files[0] });
    } else {
      setReporte({ ...reporte, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reporte.archivo && reporte.nombre && reporte.numero) {
      onAddReporte(reporte); // Agrega el reporte a la lista
      alert('¡Reporte subido exitosamente!');
      onClose(); // Cierra el formulario
      setReporte({ archivo: null, nombre: '', numero: '' }); // Limpia el formulario
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <h2 className="report-form__title">Agregar Reporte</h2>
      <input
        type="file"
        name="archivo"
        className="report-form__input"
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
        name="numero"
        placeholder="Número del reporte"
        className="report-form__input"
        value={reporte.numero}
        onChange={handleChange}
      />
      <button type="submit" className="report-form__button">
        Subir Reporte
      </button>
    </form>
  );
};

// Componente Principal Reportes
const Reportes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [reportes, setReportes] = useState([]);
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const obtenerReportes = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/reportes/verReportes'
        );
        if (!response.ok && response.length > 0) {
          throw new Error('No se pudieron obtener los reportes.');
        }
        const data = await response.json();
        // console.log(data); // Verifica la estructura de los datos aquí
        setReportes(data.reportes || []); // Asegúrate de que el campo "reportes" exista en la respuesta
      } catch (error) {
        setError(error.message); // Captura y muestra el error
      }
    };

    obtenerReportes();
  }, []);

  const toggleForm = () => setMostrarFormulario(!mostrarFormulario);

  const agregarReporte = (nuevoReporte) => {
    setReportes([...reportes, nuevoReporte]); // Agrega el nuevo reporte a la lista
  };
  
  const deleteReport = async (e) => {
    const id = e.target.id;
    try {
      const response = await fetch(`http://localhost:3000/api/reportes/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('No se pudo eliminar el reporte.');
      }
  
      const data = await response.json();
      console.log('Respuesta del servidor:', data); // Verifica la estructura de los datos aquí
  
      // Elimina el reporte del estado
      const updatedReports = reportes.filter((reporte) => reporte.id !== id);
      setReportes(updatedReports);
  
      window.location.reload()
      throw new Error('Reporte eliminado correctamente');

    } catch (error) {
      setError(error.message); // Muestra el error si ocurre
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="container">
      <NavBar />
      <Sidebar />
      <div className="content">
        <h2 className="report-list__title">Reportes</h2>

        {error && <p className="error-message">{error}</p>} {/* Muestra el error si hay */}

        {reportes.length > 0 ? (
          reportes.map((reporte, index) => (
            <div className="report-list__item" key={index}>
              <span>
                <strong>{reporte.nombre}</strong>
              </span>
              <p>{reporte.id_usuario}</p>
              <p>{reporte.fecha}</p>
              <button id={reporte.id} onClick={deleteReport} className="report-list__button">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
              </button>
            </div>
          ))
        ) : (
          <p>No hay reportes disponibles.</p> // Muestra mensaje si no hay reportes
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
