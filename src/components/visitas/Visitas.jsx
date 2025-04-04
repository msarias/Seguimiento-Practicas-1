import React, { useState, useEffect } from "react";
import NavBar from "../generales/NavBar";
import Sidebar from "../generales/Sidebar";

function Visitas() {
  const [showForm, setShowForm] = useState(false);
  const [visitas, setVisitas] = useState([]); // Estado para almacenar visitas

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddVisita = (e) => {
    e.preventDefault();
    const fecha = e.target.dia.value;
    const motivo = e.target["motivo-visita"].value;

    if (fecha && motivo) {
      // Agregar nueva visita al estado
      const nuevaVisita = { motivo, id: Date.now() };
      setVisitas([...visitas, nuevaVisita]);

      console.log("Nueva visita agregada:", nuevaVisita);
      e.target.reset();
      setShowForm(false);
    }
  };

    useEffect(() => {
      const obtenerVisitas = async () => {
        try {
          const response = await fetch(
            'http://localhost:3000/api/visitas/verVisitas'
          );
          if (!response.ok && visitas.length > 0) {
            throw new Error('No se pudieron obtener los reportes.');
          }
          const data = await response.json();
          setVisitas(data.visitas || []);
          console.log(data.visitas || []);
        } catch (error) {
          console.log(error.message);
        }
      };
      obtenerVisitas();
    }, [visitas.length]);

  return (
    <div className="container">
      <NavBar />
      <Sidebar />
      <div className="visits-section">
        <h2 className="visit-list__title">Visitas</h2>

        {/* Mostrar visitas almacenadas */}
        <div className="visit-list">
          {visitas.length === 0 ? (
            <p>No hay visitas registradas</p>
          ) : (
            visitas.map((visita) => (
              <div key={visita.id} className="report-list__item">
                  <p>{visita.direccion}</p> 
                  <p>{visita.tipo}</p> 
                  <p>{visita.fecha}</p>
                <button className="visit-list__button">Ver</button>
              </div>
            ))
          )}
        </div>

        {/* Formulario para agregar visita */}
        {showForm && (
          <form className="visit-form" onSubmit={handleAddVisita}>
            <h2>Solicitud de visita</h2>
            <input
              type="date"
              name="dia"
              placeholder="Día de la visita"
              className="visit-form__input"
              required
            />
            <input
              type="text"
              name="direccion-visita"
              placeholder="Dirección de la empresa"
              className="visit-form__input"
              required
            />
            <select className="login-input">
              <option value="Presencial">Presencial</option>
              <option value="Virtual">Virtual</option>
            </select>
            <button type="submit" className="visit-form__button">
              Solicitar
            </button>
          </form>
        )}

        {/* Botón para abrir/cerrar formulario */}
        <button className="new-visit-button" onClick={toggleForm}>
          {showForm ? "Cancelar" : "Solicitar visita"}
        </button>
      </div>
    </div>
  );
}

export default Visitas;
