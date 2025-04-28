// Content.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AsignarAprendiz from '../usuarios/AsignarAprendiz'; // Importamos el componente AsignarAprendiz

const Content = () => {
  const { id } = useParams(); // Si el id viene de la URL
  const [usuario, setUsuario] = useState(null); // Guardamos la información del usuario
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores
  const [mostrarAsignar, setMostrarAsignar] = useState(false); // Estado para mostrar el formulario de asignación

  // En lugar de 'id' en useParams, intenta obtenerlo de localStorage
  const userId = id || localStorage.getItem("usuarioId");

  // Función para obtener los datos del usuario
  const obtenerUsuario = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/usuarios/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUsuario(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error al obtener los datos del usuario.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      obtenerUsuario();
    } else {
      setError("No se ha encontrado el id del usuario.");
    }
  }, [userId]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="content">
      <section className="info-section">
        <img src="../css/img/user.png" alt="Profile" />
        <div>
          <h2>Información del Aprendiz</h2>
          <p>{usuario?.nombres}</p>
          <p>{usuario?.apellidos}</p>
          <p>{usuario?.correo}</p>
          <p>{usuario?.identificacion}</p>
        </div>
      </section>
      <section className="pending-info-section">
        <h3>Información pendiente del aprendiz</h3>
        <p>
          Aquí va la información sobre las tareas o actividades pendientes del aprendiz.
        </p>
      </section>

      {/* Botón para mostrar/ocultar el formulario de asignación */}
      <button onClick={() => setMostrarAsignar(!mostrarAsignar)}>
        {mostrarAsignar ? 'Cancelar Asignación' : 'Asignar Aprendiz'}
      </button>

      {/* Renderizamos el componente AsignarAprendiz solo cuando 'mostrarAsignar' es true */}
      {mostrarAsignar && <AsignarAprendiz />}
    </div>
  );
};

export default Content;
