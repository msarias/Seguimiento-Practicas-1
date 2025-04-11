import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../generales/NavBar';
import Sidebar from '../generales/Sidebar';

const Fichas = () => {
    const [fichas, setFichas] = useState([]);

    useEffect(() => {
        const obtenerFichas = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/fichas'); // Ajusta el endpoint si es necesario
                setFichas(response.data.fichas); // Asegúrate que el backend responde con { fichas: [...] }
            } catch (error) {
                console.error('Error al obtener las fichas:', error);
            }
        };

        obtenerFichas();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Navbar />
            <div className="flex-1">
                <Sidebar />
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-6">Listado de Fichas</h1>
                    {fichas.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {fichas.map((ficha) => (
                                <div key={ficha.codigo} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                                    <p className="text-lg font-semibold text-blue-600">Ficha: {ficha.codigo}</p>
                                    <p className="text-gray-700 mt-2">Programa: {ficha.nombre}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No hay fichas registradas.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Fichas;