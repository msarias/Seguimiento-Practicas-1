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
        <div className="container">
            <Navbar />
            <Sidebar />
            <div className="content">
                <div className="">
                    <h1 className="">Listado de Fichas</h1>
                    {fichas.length > 0 ? (
                        <div className="">
                            {fichas.map((ficha) => (
                                <div key={ficha.codigo} className="">
                                    <p className="">Ficha: {ficha.codigo}</p>
                                    <p className="">Programa: {ficha.nombre}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="">No hay fichas registradas.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Fichas;