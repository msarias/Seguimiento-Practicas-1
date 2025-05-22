import {useState, useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {API_URL} from "../../api/globalVars";
import Navbar from "../generales/NavBar";
import Sidebar from "../generales/Sidebar";

const AjustesUsuario = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    identificacion: "",
    correo: ""
    // contraseña: ''
  });

  const userId = localStorage.getItem("usuarioId");

  const obtenerUsuarioPorId = async () => {
    try {
      const url = `${API_URL}/api/usuarios/${userId}`;
      const response = await axios.get(url);
      setFormData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerUsuarioPorId(userId);
  }, [userId]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${API_URL}/api/usuarios/${userId}`;
      const response = await axios.put(url, formData);
      Swal.fire({
        icon: "success",
        title: "Datos actualizados",
        text:
          response.data.message || "Sus datos se han actualizado correctamente",
        toast: true,
        position: "bottom-left",
        showConfirmButton: false,
        timer: 1200
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message || "Error al actualizar los datos.",
        toast: true,
        position: "bottom-left",
        showConfirmButton: false,
        timer: 1200
      });
    }
  };

  return (
    <div className="container">
      <Navbar />
      <Sidebar />
      <div className="content">
        <div className="register-form">
          <h2 className="">Ajustes de Usuario</h2>
          <form className="form" onSubmit={handleSubmit}>
            <label className="label register-label" htmlFor="nombres">
              Nombres
            </label>
            <input
              className="input register-input"
              type="text"
              id="nombres"
              name="nombres"
              placeholder="Ingrese sus nombres"
              value={formData.nombres}
              onChange={handleChange}
            />

            <label className="label register-label" htmlFor="apellidos">
              Apellidos
            </label>
            <input
              className="input register-input"
              type="text"
              id="apellidos"
              name="apellidos"
              placeholder="Ingrese sus apellidos"
              value={formData.apellidos}
              onChange={handleChange}
            />

            <label className="label register-label" htmlFor="identificacion">
              Identificación
            </label>
            <input
              className="input register-input"
              type="number"
              id="identificacion"
              name="identificacion"
              placeholder="Ingrese su número de identificación"
              value={formData.identificacion}
              onChange={handleChange}
            />

            <label className="label register-label" htmlFor="correo">
              Correo Electrónico
            </label>
            <input
              className="input register-input"
              type="email"
              id="correo"
              name="correo"
              placeholder="Ingrese su correo electrónico"
              value={formData.correo}
              onChange={handleChange}
            />

            {/* <label className='register-label' htmlFor='contraseña'>
					Nueva Contraseña
					</label>
					<input
					className='register-input'
					type='password'
					id='contraseña'
					name='contraseña'
					value={formData.contraseña}
					onChange={handleChange}
					placeholder='••••••••'
					/> */}

            <button type="submit" className="button register-button">
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AjustesUsuario;