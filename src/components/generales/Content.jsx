import React, { useState, useEffect } from "react";
import axios from "axios";

const Content = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [empresa, setEmpresa] = useState({
    nombre: "",
    direccion: "",
    encargado: "",
    contacto: "",
  });

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEmpresaChange = (e) => {
    const { name, value } = e.target;
    setEmpresa((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmpresaSubmit = async (e) => {
    e.preventDefault();
    try {
      // Crear la empresa
      const res = await axios.post("/api/empresas", empresa);
      const empresaId = res.data.id;

      // Asignar la empresa al usuario
      await axios.put(`/api/usuarios/${usuario.id}/asignar-empresa`, {
        empresaId,
      });

      setUsuario((prev) => ({ ...prev, empresaId }));
      alert("Empresa registrada y asignada al usuario correctamente.");
    } catch (error) {
      console.error("Error al guardar empresa:", error);
      alert("Hubo un error al registrar la empresa.");
    }
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
  
        const res = await axios.get("http://localhost:3000/api/usuarios/usuario-actual", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setUsuario(res.data);
      } catch (error) {
        console.error("Error obteniendo datos del usuario:", error.response?.data || error.message);
      }
    };
  
    fetchUsuario();
  }, []);
  
  if (!usuario) return <div className="content">Cargando datos del usuario...</div>;

  return (
    <div className="content">
      <section className="info-section" onClick={toggleExpand} style={{ cursor: "pointer" }}>
        <img src="../css/img/user.png" alt="Profile" />
        <div>
          <h2>
            {usuario.nombre} {usuario.apellido}
          </h2>
          <p>Rol: {usuario.rol}</p>
          {isExpanded && (
            <>
              <p>Correo: {usuario.correo}</p>
              <p>Ficha: {usuario.ficha}</p>
            </>
          )}
        </div>
      </section>

      <section className="pending-info-section">
        <h3>Información pendiente del aprendiz</h3>
        <p>Aquí va la información sobre las tareas o actividades pendientes del aprendiz.</p>
      </section>

      <section className="empresa-form-section">
        <h3>Registrar Empresa</h3>
        <form onSubmit={handleEmpresaSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre de la empresa"
            value={empresa.nombre}
            onChange={handleEmpresaChange}
            required
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={empresa.direccion}
            onChange={handleEmpresaChange}
            required
          />
          <input
            type="text"
            name="encargado"
            placeholder="Encargado"
            value={empresa.encargado}
            onChange={handleEmpresaChange}
            required
          />
          <input
            type="text"
            name="contacto"
            placeholder="Contacto"
            value={empresa.contacto}
            onChange={handleEmpresaChange}
            required
          />
          <button type="submit">Guardar Empresa</button>
        </form>
      </section>
    </div>
  );
};

export default Content;
