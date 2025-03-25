import React from "react";
import BitacoraForm from "./BitacoraForm";
import BitacoraList from "./BitacoraList"; // Correcto
import NavBar from "./NavBar";

const MainContent = () => {
  return (
    <main className="content">
      <NavBar />

      <BitacoraList />

      <BitacoraForm />
    </main>
  );
};

export default MainContent;
