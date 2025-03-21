import React from "react";
import Navbar from "./NavBar.jsx";
import Content from "./Content.jsx";
import Sidebar from "./Sidebar.jsx";

function Inicio() {
  return (
    <div className="container">
      <Navbar />
      <Sidebar />
        <div className="content">
          <Content />
        </div> 
    </div>
  );
}

export default Inicio;
