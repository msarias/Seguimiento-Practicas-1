import React from "react";
import BitacoraList from "./BitacoraList"; // Correcto
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

const MainContent = () => {
  return (
    <div className="container">
      <NavBar />
      <Sidebar />
      <div className="content">
        <BitacoraList />
        
      </div>
    </div>
  );
};

export default MainContent;
