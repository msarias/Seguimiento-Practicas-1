// AsignarAprendiz.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const AsignarAprendiz = () => {
  const [aprendices, setAprendices] = useState([]); // Lista de aprendices
  const [aprendizSeleccionado, setAprendizSeleccionado] = useState(""); // Aprendiz seleccionado
  const [asignados, setAsignados] = useState([]); // Aprendices asignados
  const [instructorId, setInstructorId] = useState(""); // ID del instructor

  useEffect(() => {
    const id = localStorage.getItem("usuarioId");
    setInstructorId(id);

    // Obtener la lista de aprendices
    const fetchAprendices = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/usuarios/aprendices");
        // Filtrar los usuarios para que solo se muestren los que tengan el rol de "aprendiz"
        const aprendicesConRol = res.data.filter(usuario => usuario.rol === 'aprendiz');
        console.log("Datos de aprendices con rol 'aprendiz':", aprendicesConRol);
        setAprendices(aprendicesConRol);
      } catch (err) {
        console.error("Error al obtener aprendices:", err);
      }
    };

    // Obtener los aprendices asignados al instructor
    const fetchAsignados = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/usuarios/aprendicesAsignados/${id}`);
        console.log("Datos de asignados recibidos:", res.data); // Verifica los datos de asignados
        setAsignados(res.data);
      } catch (err) {
        console.error("Error al obtener asignados:", err);
      }
    };

    if (id) {
      fetchAprendices();
      fetchAsignados();
    }
  }, []);

  // Manejar la asignación de un aprendiz al instructor
  const handleAsignar = async (e) => {
    e.preventDefault();
    if (!aprendizSeleccionado || !instructorId) return;

    try {
      await axios.put("http://localhost:3000/api/usuarios/asignarInstructor", {
        id_aprendiz: aprendizSeleccionado,
        id_instructor: instructorId,
      });
      alert("Aprendiz asignado correctamente");
      setAprendizSeleccionado(""); // Limpiar el valor seleccionado

      // Actualizar la lista de asignados
      const res = await axios.get(`http://localhost:3000/api/usuarios/aprendicesAsignados/${instructorId}`);
      setAsignados(res.data);
    } catch (err) {
      console.error("Error al asignar aprendiz:", err);
    }
  };

  return (
    <div>
      <h2>Asignar Aprendiz</h2>
      <form onSubmit={handleAsignar}>
        <select
          value={aprendizSeleccionado}
          onChange={(e) => setAprendizSeleccionado(e.target.value)}
          required
        >
          <option value="">Selecciona un aprendiz</option>
          {aprendices.length === 0 ? (
            <option value="">No hay aprendices disponibles</option>
          ) : (
            aprendices.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nombre} {/* Aquí se muestra el nombre del aprendiz */}
              </option>
            ))
          )}
        </select>
        <button type="submit">Asignar</button>
      </form>

      <h3>Aprendices Asignados</h3>
      <ul>
        {asignados.map((a) => (
          <li key={a.id}>{a.nombre}</li> // Mostramos el nombre de los aprendices asignados
        ))}
      </ul>
    </div>
  );
};

export default AsignarAprendiz;
