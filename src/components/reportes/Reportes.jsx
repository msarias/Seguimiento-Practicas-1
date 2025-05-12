import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../generales/NavBar";
import ReportForm from "./ReportForm";
import Sidebar from "../generales/Sidebar";
import Swal from "sweetalert2";
import { API_URL } from "../../api/globalVars";

const Reportes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [reportes, setReportes] = useState([]);
  const [rol, setRol] = useState("");

  useEffect(() => {
    const rolGuardado = localStorage.getItem("rol");
    if (rolGuardado) {
      setRol(rolGuardado.toLowerCase());
    }
    obtenerReportes();
  }, []);

  const obtenerReportes = async () => {
    try {
      const url = `${API_URL}/api/reportes/verReportes`;
      const { data } = await axios.get(url);
      setReportes(data.reportes || []);
      console.log(data.reportes);
      
    } catch (error) {
      console.error("Error al obtener reportes:", error.message);
    }
  };

  const toggleForm = () => setMostrarFormulario(!mostrarFormulario);

  const agregarReporte = (nuevoReporte) => {
    setReportes((prev) => [...prev, nuevoReporte]);
  };

  const deleteReport = async (e) => {
    const id = e.target.id;
    const url = `${API_URL}/api/reportes/${id}`;
    try {
      await axios.delete(url);

      await Swal.fire({
        title: "Reporte eeliminado.",
        text: "El reporte fue eliminado.",
        toast: true,
        position: "bottom-left",
        icon: "success",
        showConfirmButton: false,
        timer: 1200,
      });
      const updatedReports = reportes.filter((reporte) => reporte.id !== id);
      setReportes(updatedReports);
      obtenerReportes();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al eliminar reporte",
        text: "No se pudo eliminar el reporte.",
        toast: true,
        timer: 1200,
        showConfirmButton: false,
        position: "bottom-left",
      });
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
          reportes.map((reporte) => (
            <div className="report-list__item" key={reporte.id}>
              <p>{reporte.nombre}</p>
              <p>{reporte.motivo}</p>
              <p>{reporte.fecha}</p>
              <button
                id={reporte.id}
                onClick={deleteReport}
                className="report-list__button delete-button"
              >
                <img
                  id="delete-img"
                  src="../assets/img/trash.png"
                  alt="Eliminar"
                />
              </button>
            </div>
          ))
        )}

        {rol === "instructor" && (
          <>
            <button className="add-report" onClick={toggleForm}>
              {mostrarFormulario ? "Cerrar Formulario" : "Agregar Reporte"}
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