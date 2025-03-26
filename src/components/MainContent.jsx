import React from "react";
import BitacoraForm from "./BitacoraForm";
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
        <BitacoraForm />
      </div>
    </div>
  );
};

export default MainContent;
