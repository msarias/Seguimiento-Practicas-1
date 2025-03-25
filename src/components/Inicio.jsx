import React from "react";
import Content from "./Content.jsx";
import NavBar from "./NavBar.jsx";
// import Sidebar from "./components/Sidebar/Sidebar.jsx";

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
              Aquí va la información sobre las tareas o actividades pendiente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
