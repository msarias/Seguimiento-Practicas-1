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
    <div>
        <NavBar />
        <div className="container">
          <Sidebar />
      <div className="visits-section">
        <h2>Visitas</h2>
        <div className="visit-row">
          <input type="text" placeholder="Visita 1" readOnly />
          <button>Button</button>
        </div>
      </div>

      <button className="new-visit-button" onClick={toggleForm}>
        {showForm ? "Cancelar" : "Solicitar visita"}
      </button>

      {showForm && (
        <form className="visita-form" id="visitaForm" onSubmit={handleAddVisita}>
          <h2>Solicitud de visita</h2>
          <input type="date" name="dia" placeholder="Día de la visita" required />
          <input
            type="text"
            name="nombre-bitacora"
            placeholder="Motivo de la visita"
            required
          />
          <button type="submit">Solicitar</button>
        </form>
      )}
    </div>
    </div>
  );
}

export default Visitas;
