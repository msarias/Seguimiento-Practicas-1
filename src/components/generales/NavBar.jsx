import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [mostrarPopup, setMostrarPopup] = useState(false);

  useEffect(() => {
    const cargarNotificaciones = () => {
      const notificacionesGuardadas = JSON.parse(localStorage.getItem("notificaciones")) || [];
      setNotificaciones(notificacionesGuardadas);
    };
  
    cargarNotificaciones();
  
    const handler = () => {
      cargarNotificaciones();
    };
  
    window.addEventListener("notificacionesActualizadas", handler);
  
    return () => {
      window.removeEventListener("notificacionesActualizadas", handler);
    };
  }, []);

  const handleCerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('notificaciones');
    window.location.href = '/';
  };

  const handleNotificacionLeida = (id) => {
    const nuevas = notificaciones.map((n) =>
      n.id === id ? { ...n, estado: 'leida' } : n
    );
    setNotificaciones(nuevas);
    localStorage.setItem('notificaciones', JSON.stringify(nuevas));
  };

  const notificacionesPendientes = notificaciones.filter(
    (n) => n.estado === 'pendiente'
  );

  return (
    <nav className="navbar">
      <img
        src="../css/img/sena-logo-verde.png"
        alt="Inicio"
        className="navbar-logo"
        draggable="false"
      />
      <div className="navbar-items">
        <div className="navbar-notifications" onClick={() => setMostrarPopup(!mostrarPopup)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="28"
            height="28"
            className="navbar-icon"
            style={{ cursor: 'pointer' }}
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 2C8.13 2 5 5.13 5 8v4c0 1.1-.9 2-2 2v2h14v-2c-1.1 0-2-.9-2-2V8c0-2.87-3.13-6-7-6zm0 16c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm-3-2v-1h6v1H9z"
            />
          </svg>
          {notificacionesPendientes.length > 0 && (
            <span className="notification-count">
              {notificacionesPendientes.length}
            </span>
          )}
        </div>

        <input
          type="button"
          value="Cerrar sesión"
          className="navbar-logout"
          onClick={handleCerrarSesion}
        />

        <img
          src="../css/img/user.png"
          alt="Usuario"
          className="navbar-icon"
          draggable="false"
        />
        <Link to={'/Inicio'} draggable="false">
          <img
            src="../css/img/home.png"
            alt="Home"
            className="navbar-icon"
            draggable="false"
          />
        </Link>
      </div>

      {/* Popup de notificaciones */}
      {mostrarPopup && (
        <div className="notification-popup">
          <h3>Notificaciones</h3>
          {notificaciones.length === 0 ? (
            <p>No tienes notificaciones.</p>
          ) : (
            notificaciones.map((notificacion) => (
              <div
                key={notificacion.id}
                className={`notification-item ${notificacion.estado === 'pendiente' ? 'pendiente' : 'leida'}`}
              >
                <p>{notificacion.mensaje}</p>
                {notificacion.estado === 'pendiente' && (
                  <button
                    onClick={() => handleNotificacionLeida(notificacion.id)}
                  >
                    Marcar como leída
                  </button>
                )}
              </div>
            ))
          )}
          <button onClick={() => setMostrarPopup(false)} className="cerrar-popup">
            Cerrar
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
