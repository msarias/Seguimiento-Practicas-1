import React from "react";
import NavBar from "./NavBar";
import BitacoraList from './BitacoraList';  // Correcto
import BitacoraForm from "./BitacoraForm";
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

