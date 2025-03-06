import React from "react";
import Navigation from "./components/Navigation/Navigation.jsx";
import Content from "./components/Content/Content.jsx";

function Inicio() {
  return (
    <div>
      <Navigation />
      <div className="container">
        <div className="content">
          <Content />
          <div className="pending-info-section">
            <h3>Información del aprendiz</h3>
            <p>
              Aquí va la información sobre las taeras o actividades pendiente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Inicio;
