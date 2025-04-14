import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../generales/NavBar';
import Sidebar from '../generales/Sidebar';

const Fichas = () => {
  const [fichas, setFichas] = useState([]);

  useEffect(() => {
    const obtenerFichas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/fichas'); // Asegúrate que este endpoint exista
        setFichas(response.data);
      } catch (error) {
        console.error('Error al obtener las fichas:', error);
      }
    };

    obtenerFichas();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <Sidebar />
      <div className="content p-4">
        <h1 className="text-2xl font-bold mb-4">Listado de Fichas</h1>
        {fichas.length > 0 ? (
          fichas.map((ficha) => (
            <div key={ficha.id} className="border rounded-xl shadow-md p-4 mb-4">
              <p className="font-semibold">Ficha: {ficha.codigo}</p>
              <h2 className="font-semibold">Aprendices:</h2>
              <ul className="list-disc pl-5">
                {ficha.aprendices?.map((aprendiz) => (
                  <li key={aprendiz.id}>
                    {aprendiz.nombres} {aprendiz.apellidos}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay fichas registradas.</p>
        )}
      </div>
    </div>
  );
};

export default Fichas;
