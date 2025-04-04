// Componente ReportForm
import React, { useState, useEffect } from "react";
import NavBar from "../generales/NavBar";  // Importa tu componente Navbar existente
import Sidebar from "../generales/Sidebar";  // Importa tu componente Sidebar existente
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

  const uploadReport = async () => {
    // Verifica que todos los campos sean correctos
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
      const response = await fetch('http://localhost:3000/api/reportes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reporte),
      });

      if (!response.ok) {
        throw new Error('Error al subir el reporte.');
      }

      const data = await response.json();

      // Si se recibe un reporte, se actualiza el estado en el componente principal
      if (data.reporte) {
        onAddReporte(data.reporte); // Llamamos a la función del componente padre para agregar el reporte
        alert('¡Reporte subido exitosamente!');
        onClose(); // Cerramos el formulario
        setReporte({ id_usuario: '', nombre: '', motivo: '', fecha: '' }); // Limpiamos el formulario
        
        
        setTimeout(()=>{
          window.location.reload();     
        }, 1000)

      } else {
        console.error('No se recibió el reporte esperado en la respuesta.');
        window.location.reload();
      }
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

// Componente Reportes
const Reportes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [reportes, setReportes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerReportes = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/reportes/verReportes'
        );
        if (!response.ok && reportes.length > 0) {
          throw new Error('No se pudieron obtener los reportes.');
        }
        const data = await response.json();
        setReportes(data.reportes || []);
      } catch (error) {
        setError(error.message);
      }
    };
    obtenerReportes();
  }, [reportes.length]);

  const toggleForm = () => setMostrarFormulario(!mostrarFormulario);

  const agregarReporte = (nuevoReporte) => {
    setReportes([...reportes, nuevoReporte]);
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
      console.log('Reporte eliminado:', data);
      const updatedReports = reportes.filter((reporte) => reporte.id !== id);
      setReportes(updatedReports);
      window.location.reload();
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
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
              <p>{reporte.id_usuario}</p>
              <p>{reporte.motivo}</p>
              <button
                id={reporte.id}
                onClick={deleteReport}
                className="report-list__button delete-button"
              >
                <img id='delete-img' src="../css/img/trash.png" alt="Eliminar" />
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