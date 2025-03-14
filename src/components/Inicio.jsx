import React from "react";
import Navbar from "./NavBar.jsx";
import Content from "./Content.jsx";

function Inicio() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="content">
          <Content />
          <div className="pending-info-section">
            <h3>Información del aprendiz</h3>
            <p>
              Aquí va la información sobre las tareas o actividades pendiente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Inicio;
