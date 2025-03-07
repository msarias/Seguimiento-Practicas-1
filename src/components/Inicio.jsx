import React from "react";
<<<<<<< HEAD
<<<<<<< HEAD:src/Inicio.jsx
import Navbar from "./components/Navbar.jsx";
// import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Content from "./components/Content.jsx";
=======
import Navigation from "./Navigation.jsx";
import Content from "./Content.jsx";
>>>>>>> f8a4868db30059d4aaf0d852792fd975fbd95df9:src/components/Inicio.jsx
=======
import Navbar from "./Navbar.jsx";
// import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Content from "./Container.jsx";
>>>>>>> msarias

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
              Aquí va la información sobre las taeras o actividades pendiente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Inicio;
