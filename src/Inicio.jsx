import React from "react";
import Navigation from "./components/Navigation/Navigation.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Content from "./components/Content/Content.jsx";

function Inicio() {
  return (
    <div>
      <Navigation />
      <div className="container">
        <Sidebar />
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
