import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../generales/NavBar";
import Sidebar from "../generales/Sidebar";
import Swal from "sweetalert2";

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
      const url = "http://localhost:3000/api/fichas";
      const response = await axios.get(url);
      const data = response.data;
      setFichas(data.fichas);
    } catch (error) {
      console.error("Error al obtener las fichas:", error.message);
    }
  };

  obtenerFichas();

  const subirFicha = async (e) => {
    e.preventDefault();

    if (!formData.codigo || !formData.programa) {
      //   console.error("Por favor, complete todos los campos.");
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos.",
        toast: true,
      });
      return;
    }

    try {
      const url = "http://localhost:3000/api/fichas";
      await axios.post(url, formData);
      obtenerFichas();
    } catch (error) {
      console.error("Error al crear la ficha:", error.message);
    }
  };

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
        <div className="form-fichas.container">
          <h2 className="">Crear Nueva Ficha</h2>
          <form onSubmit={subirFicha} className="form-fichas">
            <div className="form-group">
              <label htmlFor="codigo">Código de Ficha:</label>
              <input
                type="text"
                id="codigo"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                className=""
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="programa">Nombre del Programa:</label>
              <input
                type="text"
                id="programa"
                name="programa"
                value={formData.programa}
                onChange={handleChange}
                className=""
                required
              />
            </div>
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