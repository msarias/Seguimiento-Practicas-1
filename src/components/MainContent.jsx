import React from "react";
import NavBar from "./Navbar";
import BitacoraList from './BitacoraList';  // Correcto
import BitacoraForm from "./BitacoraForm";

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