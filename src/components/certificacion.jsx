import RequestCertification from "./RequestCertification.jsx";
import Certifications from "./SolicitarCertificacion";
import React from "react";
import NavBar from "./NavBar.jsx";
import Sidebar from "./Sidebar.jsx";

const Certificacion = () => {
    return (
      <div className="container">
        <NavBar />
        <Sidebar />
        <div className="content">
          <Certifications/>
          <RequestCertification/>
        </div>
      </div>
    );
  }

export default Certificacion;