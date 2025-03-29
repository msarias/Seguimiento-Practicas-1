import React, { useState } from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

function Visitas() {
  const [showForm, setShowForm] = useState(false);
  const [visitas, setVisitas] = useState([]); // Estado para almacenar visitas

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddVisita = (e) => {
    e.preventDefault();
    const fecha = e.target.dia.value;
    const motivo = e.target["motivo-visita"].value;

    if (fecha && motivo) {
      // Agregar nueva visita al estado
      const nuevaVisita = { motivo, id: Date.now() };
      setVisitas([...visitas, nuevaVisita]);

      console.log("Nueva visita agregada:", nuevaVisita);
      e.target.reset();
      setShowForm(false);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <Sidebar />
      <div className="visits-section">
        <h2 className="visit-list__title">Visitas</h2>

        {/* Mostrar visitas almacenadas */}
        <div className="visit-list">
          {visitas.length === 0 ? (
            <p>No hay visitas registradas</p>
          ) : (
            visitas.map((visita) => (
              <div key={visita.id} className="visit-list__item">
                <span className="visit-list__name">
                  {visita.fecha} {visita.motivo}
                </span>
                <button className="visit-list__button">Ver</button>
              </div>
            ))
          )}
        </div>

        {/* Formulario para agregar visita */}
        {showForm && (
          <form className="visit-form" onSubmit={handleAddVisita}>
            <h2>Solicitud de visita</h2>
            <input
              type="date"
              name="dia"
              placeholder="Día de la visita"
              className="visit-form__input"
              required
            />
            <input
              type="text"
              name="motivo-visita"
              placeholder="Motivo de la visita"
              className="visit-form__input"
              required
            />
            <button type="submit" className="visit-form__button">
              Solicitar
            </button>
          </form>
        )}

        {/* Botón para abrir/cerrar formulario */}
        <button className="new-visit-button" onClick={toggleForm}>
          {showForm ? "Cancelar" : "Solicitar visita"}
        </button>
      </div>
    </div>
  );
}

export default Visitas;
