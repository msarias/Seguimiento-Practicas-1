import React, { useState } from "react";
import NavBar from "./NavBar";  // Importa tu componente Navbar existente
import Sidebar from "./Sidebar";  // Importa tu componente Sidebar existente


const ReportForm = ({ onAddReporte, onClose }) => {
    const [reporte, setReporte] = useState({
      archivo: null,
      nombre: "",
      numero: ""
    });
  
    const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (name === "archivo") {
        setReporte({ ...reporte, archivo: files[0] });
      } else {
        setReporte({ ...reporte, [name]: value });
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (reporte.archivo && reporte.nombre && reporte.numero) {
        onAddReporte(reporte);  // Agrega el reporte a la lista
        alert("¡Reporte subido exitosamente!");
        onClose();  // Cierra el formulario
        setReporte({ archivo: null, nombre: "", numero: "" });  // Limpia el formulario
      } else {
        alert("Por favor, completa todos los campos.");
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
        <button type="submit" className="report-form__button">Subir Reporte</button>
      </form>
    );
  };
  
  // Componente Principal Reportes
  const Reportes = () => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [reportes, setReportes] = useState([
      { nombre: "Reporte 1", archivo: null, numero: "001" }  // Ejemplo inicial
    ]);
  
    const toggleForm = () => setMostrarFormulario(!mostrarFormulario);
  
    const agregarReporte = (nuevoReporte) => {
      setReportes([...reportes, nuevoReporte]);  // Agrega el nuevo reporte
    };
  
    return (
      <div>
        <NavBar />
        <div className="container">
          <Sidebar />
          <div className="content">
            <h2 className="report-list__title">Reportes</h2>
  
            {reportes.length > 0 ? (
              reportes.map((reporte, index) => (
                <div className="report-list__item" key={index}>
                  <span><strong>{reporte.nombre}</strong></span>
                  <button className="report-list__button">Ver</button>
                </div>
              ))
            ) : (
              <p>No hay reportes disponibles.</p>
            )}
  
            <button className="add-report" onClick={toggleForm}>
              {mostrarFormulario ? "Cerrar Formulario" : "Agregar Reporte"}
            </button>
  
            {mostrarFormulario && (
              <ReportForm onAddReporte={agregarReporte} onClose={toggleForm} />
            )}
          </div>
        </div>
      </div>
    );
  };

export default Reportes;
