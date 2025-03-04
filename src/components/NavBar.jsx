// NavBar.js
import React from 'react';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__buttons">
                <input type="text" className="navbar__search" placeholder="Buscar..." />
                <img src="./css/img/foto-persona.png" alt="Usuario" className="navbar__user-img" width="30" />
                <img src="./css/img/sena-logo (1).png" alt="Inicio" className="navbar__home-img" width="30" />
            </div>
        </nav>
    );
};

export default NavBar;
