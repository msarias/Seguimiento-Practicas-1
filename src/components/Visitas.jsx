import React, { useState } from "react";
import NavBar from "./NavBar";  // Importa tu componente Navbar existente
import Sidebar from "./Sidebar";

function Visitas() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddVisita = (e) => {
    e.preventDefault();
    const fecha = e.target.dia.value;
    const motivo = e.target["nombre-bitacora"].value;

    if (fecha && motivo) {
      console.log("Nueva visita:", { fecha, motivo });
      e.target.reset();
      setShowForm(false);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <Sidebar />
      <div className="visits-section">
        <h2 className="report-list__title">Visitas</h2>
        <div className="report-list__item">
          <input type="text" placeholder="Visita 1" readOnly />
          <button className="report-list__button">Button</button>
        </div>

        <div>
          {showForm && (
            <form
              className="report-form"
              id="visitaForm"
              onSubmit={handleAddVisita}
            >
              <h2>Solicitud de visita</h2>
              <input
                type="date"
                name="dia"
                placeholder="Día de la visita"
                className="report-form__input"
                required
              />
              <input
                type="text"
                name="nombre-bitacora"
                placeholder="Motivo de la visita"
                className="report-form__input"
                required
              />
              <button type="submit" className="report-form__button">
                Solicitar
              </button>
            </form>
          )}
          <button className="add-report" onClick={toggleForm}>
            {showForm ? "Cancelar" : "Solicitar visita"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Visitas;

