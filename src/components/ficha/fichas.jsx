import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../generales/NavBar";
import Sidebar from "../generales/Sidebar";
import { API_URL } from "../../api/globalVars";

const Fichas = () => {
  const [formData, setFormData] = useState({
    codigo: "",
    programa: "",
  });

  const [fichas, setFichas] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const obtenerFichas = async () => {
    try {
      const url = `${API_URL}/api/fichas`;
      const response = await axios.get(url);
      const data = response.data;
      setFichas(data);
    } catch (error) {
      console.error("Error al obtener las fichas:", error.message);
    }
  };

  useEffect(() => {
    obtenerFichas();
  }, [])

  const subirFicha = async (e) => {
    e.preventDefault();

    if (!formData.codigo || !formData.programa) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos.",
        toast: true,
      });
      return;
    }

    try {
      const url = `${API_URL}/api/fichas`;
      await axios.post(url, formData);

      Swal.fire({
        icon: "success",
        timer: 1200,
        text: "Ficha creada exitosamente.",
        toast: true,
        position: "bottom-left",
        showConfirmButton: false,
      })

      obtenerFichas();
    } catch (error) {
      console.error("Error al crear la ficha:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error al crear ficha",
        text: error.response?.data?.message || 'Error creando la ficha',
        toast: true,
        position: "bottom-left",
        timer: 1200,
        showConfirmButton: false,
      })
    }
  };

  const eliminarFicha = async (e) => {
    const id = e.target.id;
    const url = `${API_URL}/api/fichas/${id}`;
    try {
      await axios.delete(url);
      obtenerFichas();
    } catch (error) {
      console.error("Error al eliminar la ficha:", error.message);
    }
  }

  return (
    <div className="container">
      <Navbar />
      <Sidebar />
      <div className="content">
        <div className="">
          <h1 className="">Listado de Fichas</h1>
          {fichas?.length > 0 ? (
            <div className="">
              {fichas.map((ficha) => (
                <div key={ficha.codigo} className="report-list__item">
                  <b>{ficha.id}</b>
                  <p className="">Ficha: {ficha.codigo}</p>
                  <p className="">Programa: {ficha.programa}</p>
                  <button id={ficha.id} onClick={eliminarFicha}>X</button>
                </div>
              ))}
            </div>
          ) : (
            <p className="">No hay fichas registradas.</p>
          )}
        </div>
        <div className="form-container">
          <h2 className="register-title">Crear Nueva Ficha</h2>
          <form onSubmit={subirFicha} className="form">
            <label htmlFor="codigo" className="register-label">
              Código de Ficha:
            </label>
            <input
              type="text"
              className="register-input"
              id="codigo"
              name="codigo"
              placeholder="Ingrese el código de la ficha"
              pattern="[0-9]*"
              value={formData.codigo}
              onChange={handleChange}
              required
            />
            <label htmlFor="programa" className="register-label">
              Nombre del Programa:
            </label>
            <input
              type="text"
              className="register-input"
              id="programa"
              name="programa"
              plaaceholder="Ingrese el nombre del programa"
              value={formData.programa}
              onChange={handleChange}
              required
            />
            <button type="submit" className="register-button">
              Crear Ficha
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Fichas;