import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../generales/NavBar';
import Sidebar from '../generales/Sidebar';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  const obtenerUsuarios = async () => {
    try {
      const url = 'http://localhost:3000/api/usuarios/listarUsuarios';
      const response = await axios.get(url);
      const data = response.data;
      setUsuarios(data.usuarios || []);
    } catch (error) {
      console.log(error.response);
      setError('No se pudieron obtener los usuarios.');
    }
  };

  useEffect(() => {
    obtenerUsuarios();
    console.log('Usuarios:', usuarios);
  }, []);

  return (
    <div className="container">
      <Navbar />
      <Sidebar />
      <div className="content">
        <h1>Usuarios</h1>
        {error && <p className="error-message">{error}</p>}
        {usuarios.length > 0 ?  (
          usuarios.map((user) => (
            <div className="report-list__item" key={user.id}>
              <p>{'Nombre: ' + user.nombres + ' ' + user.apellidos}</p>
              <p>{'Correo: ' + user.correo}</p>
              <p>{'Nro. Identificación: ' + user.identificacion}</p>
              <p>{'Rol: ' + user.rol}</p>
            </div>
          ))
        ) : (
          <p>No hay usuarios registrados.</p>
        )}
      </div>
    </div>
  );
};

export default Usuarios;
