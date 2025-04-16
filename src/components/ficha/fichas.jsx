import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../generales/NavBar';
import Sidebar from '../generales/Sidebar';

const Fichas = () => {
  const [fichas, setFichas] = useState([]);
  const [fichaActiva, setFichaActiva] = useState(null);

  useEffect(() => {
    const obtenerFichas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/fichas');
        setFichas(response.data);
      } catch (error) {
        console.error('Error al obtener las fichas:', error);
      }
    };

    obtenerFichas();
  }, []);

  const toggleFicha = (id) => {
    setFichaActiva(id);
  };

  const volver = () => {
    setFichaActiva(null);
  };

  return (
    <div className="container">
      <Navbar />
      <Sidebar />
      <div className="content p-4">
        <h1 className="titulo-fichas">Fichas</h1>
        {fichas.length > 0 ? (
          <div className="ficha-grid">
            {fichas.map((ficha) => {
              const activa = fichaActiva === ficha.id;
              if (fichaActiva !== null && !activa) return null;

              return (
                <div
                  key={ficha.id}
                  className={`ficha-card-wrapper ${activa ? 'activa' : ''}`}
                >
                  <div
                    className={`ficha-card ${activa ? 'expandida' : ''}`}
                    onClick={() => !activa && toggleFicha(ficha.id)}
                  >
                    <div className="ficha-header">Ficha</div>
                    <div className="ficha-codigo">{ficha.codigo}</div>

                    {activa && (
                      <div className="aprendices-contenedor">
                        {ficha.aprendices?.length > 0 ? (
                          ficha.aprendices.map((aprendiz) => (
                            <div key={aprendiz.id} className="aprendiz-linea">
                              <div className="linea-flex">
                                <strong>Nombre:</strong>
                                <span>{aprendiz.nombres} {aprendiz.apellidos}</span>
                              </div>
                              <div className="linea-flex">
                                <strong>Identificación:</strong>
                                <span>{aprendiz.identificacion}</span>
                              </div>
                              <div className="linea-flex">
                                <strong>Correo:</strong>
                                <span>{aprendiz.correo}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="aprendiz-linea">Sin aprendices</div>
                        )}

                        <button className="btn-volver" onClick={volver}>
                          Volver
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="mensaje-vacio">No hay fichas registradas.</p>
        )}
      </div>
    </div>
  );
};

export default Fichas;
