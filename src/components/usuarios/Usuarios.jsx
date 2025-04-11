import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../generales/NavBar';
import Sidebar from '../generales/Sidebar';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);

    const obtenerUsuarios = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/usuarios/listarUsiarios'
            );
            const data = response.data;
            setUsuarios (data.usuarios || [])
        } catch (error) {
            setError ('No se pudieron obtener los reportes');
        }
    };

    useEffect(() =>{
        obtenerUsuarios();
    },[]);

    return (
        <div className="container">
            <Navbar />
            <Sidebar />
                <div className="content">
                    <h1>Lista de usuarios</h1> 
                    {error && <p className='error-mesage'>{error}</p>}
                    {usuarios.length > 0 ? (
                        usuarios.map((usuario) => (
                            <div className="report-lista__item">
                                <p>{usuario.nombres + usuario.apellidos}</p>
                                <p>{usuario.rol}</p>
                            </div>
                        ))
                    ): (
                    <p>No hay usuarios registrados</p>
                    )}
                </div>
        </div>
    );
};

export default Usuarios;