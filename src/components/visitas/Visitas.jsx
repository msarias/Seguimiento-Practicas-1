import React, { useState, useEffect } from "react";
import NavBar from "../generales/NavBar";
import Sidebar from "../generales/Sidebar";

function Visitas() {
  const [showForm, setShowForm] = useState(false);
  const [visitas, setVisitas] = useState([]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Función para obtener visitas desde el backend
  const obtenerVisitas = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/visitas/verVisitas");
      if (!response.ok) throw new Error("No se pudieron obtener las visitas.");
      const data = await response.json();
      setVisitas(data.visitas || []);
    } catch (error) {
      console.error("Error al obtener visitas:", error.message);
    }
  };

  // Cargar visitas al iniciar el componente
  useEffect(() => {
    obtenerVisitas();
  }, []);

  // Agregar nueva visita
  const handleAddVisita = async (e) => {
    e.preventDefault();

    const nuevaVisita = {
      fecha: e.target["dia"].value,
      tipo: e.target["tipo-visita"].value,
      direccion: e.target["direccion-visita"].value,
    };

    try {
      const response = await fetch("http://localhost:3000/api/visitas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaVisita),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error al agregar visita");

      // Recargar la lista de visitas después de agregar una nueva
      await obtenerVisitas();

      e.target.reset();
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <Sidebar />
      <div className="visits-section">
        <h2 className="visit-list__title">Visitas</h2>

        <div className="visit-list">
          {visitas.length === 0 ? (
            <p>No hay visitas registradas</p>
          ) : (
            visitas.map((visita) => (
              <div key={visita.id} className="report-list__item">
                <p>{visita.direccion}</p>
                <p>{visita.tipo}</p>
                <p>{visita.fecha}</p>
                <button className="visit-list__button">Ver</button>
              </div>
            ))
          )}
        </div>

        {showForm && (
          <form className="visit-form" onSubmit={handleAddVisita}>
            <h2>Solicitud de visita</h2>
            <input
              type="date"
              name="dia"
              className="visit-form__input"
              required
            />
            <input
              type="text"
              name="direccion-visita"
              placeholder="Dirección de la empresa"
              className="visit-form__input"
              required
            />
            <select name="tipo-visita" className="login-input" required>
              <option value="Presencial">Presencial</option>
              <option value="Virtual">Virtual</option>
            </select>
            <button type="submit" className="visit-form__button">
              Solicitar
            </button>
          </form>
        )}

        <button className="new-visit-button" onClick={toggleForm}>
          {showForm ? "Cancelar" : "Solicitar visita"}
        </button>
      </div>
    </div>
  );
}

export default Visitas;
