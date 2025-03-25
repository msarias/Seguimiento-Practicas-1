import React from "react";
import Content from "./Content.jsx";
import NavBar from "./NavBar.jsx";
import Sidebar from "./Sidebar.jsx";
import Content from "./Content.jsx";


function Inicio() {
  return (
    <div className="container">
      <NavBar />
      <Sidebar />
      <div className="content">
        <Content />
      </div>
    </div>
  );
}

export default Inicio;
