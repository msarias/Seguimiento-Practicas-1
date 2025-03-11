import React from "react";
import NavBar from "./components/NavBar.jsx";
// import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Content from "./components/Content.jsx";

function Inicio() {
  return (
    <div>
      <NavBar />
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
