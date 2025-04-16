import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../generales/NavBar";
import Sidebar from "../generales/Sidebar";

const ReportForm = ({ onAddReporte, onClose }) => {
  const [reporte, setReporte] = useState({
    id_usuario: "",
    nombre: "",
    motivo: "",
    fecha: "",
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
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const url = "http://localhost:3000/api/reportes";
      const data = await axios.post(url, reporte, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.reportes) {
        onAddReporte(data.reportes);
        alert("¡Reporte subido exitosamente!");
        onClose();
        setReporte({ id_usuario: "", nombre: "", motivo: "", fecha: "" });
      }
    } catch (error) {
      console.error("Error al subir el reporte:", error);
      // alert("Error al subir el reporte.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadReport();
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

const Reportes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [reportes, setReportes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerReportes = async () => {
      try {
        const url = "http://localhost:3000/api/reportes/verReportes";
        const data = await axios.get(url);
        if (data.reportes && data.reportes.length > 0) {
          setReportes(data.reportes);
        } else {
          setError("No hay reportes disponibles.");
        }
      } catch (error) {
        setError(error.message);
        console.error("Error al obtener reportes:", error);
      }
    };

    obtenerReportes();
  }, []);

  const toggleForm = () => setMostrarFormulario(!mostrarFormulario);

  const agregarReporte = (nuevoReporte) => {
    setReportes((prev) => [...prev, nuevoReporte]);
  };

  const deleteReport = async (e) => {
    const id = e.target.id;
    try {
      const url = `http://localhost:3000/api/reportes/${id}`;
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

        <button className="add-report report-form__button" onClick={toggleForm}>
          {mostrarFormulario ? "Cerrar Formulario" : "Agregar Reporte"}
        </button>

        {mostrarFormulario && (
          <ReportForm onAddReporte={agregarReporte} onClose={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default Reportes;