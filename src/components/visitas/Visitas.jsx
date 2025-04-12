import React, { useState, useEffect } from "react";
import NavBar from "../generales/NavBar";
import Sidebar from "../generales/Sidebar";

function Visitas() {
  const [showForm, setShowForm] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [visitas, setVisitas] = useState([]);
  const [visitaEditando, setVisitaEditando] = useState(null);
  const [rol, setRol] = useState("");

  useEffect(() => {
    const rolGuardado = localStorage.getItem('rol');
    if (rolGuardado) {
      setRol(rolGuardado.toLowerCase());
    }
    obtenerVisitas();
  }, []);

  const obtenerVisitas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/visitas/verVisitas");
      setVisitas(response.data.visitas || []);
    } catch (error) {
      console.error("Error al obtener visitas:", error.message);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setModoEdicion(false);
    setVisitaEditando(null);
  };

  const obtenerVisitas = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/visitas/verVisitas");
      if (!response.ok) throw new Error("No se pudieron obtener las visitas.");
      const data = await response.json();
      setVisitas(data.visitas || []);
    } catch (error) {
      console.error("Error al obtener visitas:", error.message);
    }
  };

  const handleAddOrUpdateVisita = async (e) => {
    e.preventDefault();

    const nuevaVisita = {
      fecha: e.target['dia'].value,
      tipo: e.target['tipo-visita'].value,
      direccion: e.target['direccion-visita'].value,
    };

    try {
      const url = modoEdicion
        ? `http://localhost:3000/api/visitas/${visitaEditando.id}`
        : "http://localhost:3000/api/visitas";
      const method = modoEdicion ? "PUT" : "POST";

      const response = await axios({
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaVisita),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error en la solicitud");

      await obtenerVisitas();
      e.target.reset();
      setShowForm(false);
      setModoEdicion(false);
      setVisitaEditando(null);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleEditar = (visita) => {
    setModoEdicion(true);
    setVisitaEditando(visita);
    setShowForm(true);
  };

  const handleAceptar = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/visitas/aceptar/${id}`, {
        method: "PUT",
      });
      await obtenerVisitas();
    } catch (error) {
      console.error('Error al aceptar visita:', error);
    }
  };

  const handleRechazar = (visita) => {
    setVisitaRechazar(visita);
    setMostrarMotivoPopup(true);
  };

  const confirmarRechazo = async () => {
    try {
      await fetch(`http://localhost:3000/api/visitas/rechazar/${visitaRechazar.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ motivo: motivoRechazo }),
      });

      setMostrarMotivoPopup(false);
      setMotivoRechazo("");
      setVisitaRechazar(null);
      await obtenerVisitas();
    } catch (error) {
      console.error('Error al rechazar visita:', error);
    }
  };

  return (
    <div className="container">
      <NavBar />
      <Sidebar />
      <div className="visits-section">
        <h2 className="visit-list__title">Visitas</h2>

        <div className="visit-list">
          {visitas.length === 0 ? (
            <p>No hay visitas registradas</p>
          ) : (
            visitas.map((visita) => (
              <div key={visita.id} className={`report-list__item estado-${visita.estado}`}>
                <p><strong>Dirección:</strong> {visita.direccion}</p>
                <p><strong>Tipo:</strong> {visita.tipo}</p>
                <p><strong>Fecha:</strong> {visita.fecha.split("T")[0]}</p>
                <p><strong>Aprendiz:</strong> {usuario.nombre}</p>

                {/* Mostrar estado si el usuario es aprendiz */}
                {/* {rol === "aprendiz" && (
                  <p><strong>Estado:<span className={`estado ${visita.estado}`}>
                    </span></strong> {visita.estado}
                  </p>
                )} */}

                {/* Botón de editar solo para aprendices */}
                {rol === "aprendiz" && (
                  <button className="visit-list__buttone" onClick={() => handleEditar(visita)}>
                    Editar
                  </button>
                )}

                {/* Botones de aceptar/rechazar solo para instructores */}
                {rol === "instructor" && (
                  <div className="visit-buttons">
                    <button
                      className="visit-list__button accept"
                      onClick={() => handleAceptar(visita.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-checkbox"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 11l3 3l8 -8" /><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg>
                    </button>
                    <button
                      className="visit-list__button reject"
                      onClick={() => handleRechazar(visita)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-copy-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path stroke="none" d="M0 0h24v24H0z" /><path d="M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2 2 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /><path d="M11.5 11.5l4.9 5" /><path d="M16.5 11.5l-5.1 5" /></svg>
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {showForm && (
          <form className="visit-form" onSubmit={handleAddOrUpdateVisita}>
            <h2>{modoEdicion ? 'Editar Visita' : 'Solicitud de Visita'}</h2>
            <input
              type="date"
              name="dia"
              className="visit-form__input"
              required
              defaultValue={
                modoEdicion ? visitaEditando.fecha.split('T')[0] : ''
              }
            />
            <input
              type="text"
              name="direccion-visita"
              placeholder="Dirección de la visita"
              className="visit-form__input"
              required
              defaultValue={modoEdicion ? visitaEditando.direccion : ''}
            />
            <select
              name="tipo-visita"
              className="visit-form__input"
              required
              defaultValue={modoEdicion ? visitaEditando.tipo : ''}
            >
              <option value="Presencial">Presencial</option>
              <option value="Virtual">Virtual</option>
            </select>
            <button type="submit" className="visit-form__button">
              {modoEdicion ? 'Actualizar' : 'Solicitar'}
            </button>
          </form>
        )}

        {/* Botón de solicitar visita solo para aprendices */}
        {rol === "aprendiz" && (
          <button className="new-visit-button" onClick={toggleForm}>
            {showForm ? 'Cancelar' : 'Solicitar visita'}
          </button>
        )}

        {mostrarMotivoPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h3>Motivo del rechazo</h3>
              <textarea
                value={motivoRechazo}
                onChange={(e) => setMotivoRechazo(e.target.value)}
                placeholder="Escribe el motivo del rechazo..."
                className="popup-textarea"
              />
              <div className="popup-buttons">
                <button onClick={confirmarRechazo} className="popup-confirm">Confirmar</button>
                <button onClick={() => setMostrarMotivoPopup(false)} className="popup-cancel">Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Visitas;
