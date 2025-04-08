import React, { useState, useEffect } from 'react';
import NavBar from '../generales/NavBar';
import Sidebar from '../generales/Sidebar';

function Visitas() {
  const [showForm, setShowForm] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [visitas, setVisitas] = useState([]);
  const [visitaEditando, setVisitaEditando] = useState(null);

  const toggleForm = () => {
    setShowForm(!showForm);
    setModoEdicion(false);
    setVisitaEditando(null);
  };

  const obtenerVisitas = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/visitas/verVisitas'
      );
      if (!response.ok) throw new Error('No se pudieron obtener las visitas.');
      const data = await response.json();
      setVisitas(data.visitas || []);
    } catch (error) {
      console.error('Error al obtener visitas:', error.message);
    }
  };

  useEffect(() => {
    obtenerVisitas();
  }, []);

  const handleAddOrUpdateVisita = async (e) => {
    e.preventDefault();

    const nuevaVisita = {
      fecha: e.target['dia'].value,
      tipo: e.target['tipo-visita'].value,
      direccion: e.target['direccion-visita'].value,
    };

    try {
      const response = await fetch("http://localhost:3000/api/visitas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaVisita),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error al agregar visita");

      await obtenerVisitas();

      e.target.reset();
      setShowForm(false);
      setModoEdicion(false);
      setVisitaEditando(null);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleEditar = (visita) => {
    setModoEdicion(true);
    setVisitaEditando(visita);
    setShowForm(true);
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
              <div key={visita.id} className="report-list__item">
                <p>{visita.direccion}</p>
                <p>{visita.tipo}</p>
                <p>{visita.fecha}</p>
                <button
                  className="visit-list__button"
                  onClick={() => handleEditar(visita)}
                >
                  Editar
                </button>
              </div>
            ))
          )}
        </div>

        {showForm && (
          <form className="visit-form" onSubmit={handleAddOrUpdateVisita}>
            <h2>{modoEdicion ? "Editar Visita" : "Solicitud de Visita"}</h2>
            <input
              type="date"
              name="dia"
              className="visit-form__input"
              required
              defaultValue={
                modoEdicion
                  ? visitaEditando.fecha.split("T")[0]
                  : ""
              }
            />
            <input
              type="text"
              name="direccion-visita"
              placeholder="Dirección de la empresa"
              className="visit-form__input"
              required
              defaultValue={modoEdicion ? visitaEditando.direccion : ""}
            />
            <select
              name="tipo-visita"
              className="login-input"
              required
              defaultValue={modoEdicion ? visitaEditando.tipo : ""}
            >
              <option value="Presencial">Presencial</option>
              <option value="Virtual">Virtual</option>
            </select>
            <button type="submit" className="visit-form__button">
              {modoEdicion ? "Actualizar" : "Solicitar"}
            </button>
          </form>
        )}

        <button className="new-visit-button" onClick={toggleForm}>
          {showForm ? 'Cancelar' : 'Solicitar visita'}
        </button>
      </div>
    </div>
  );
}

export default Visitas;