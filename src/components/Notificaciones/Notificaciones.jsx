
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Para los popups 
import { io } from "socket.io-client"; //se hce la conexion en tiempo real
import moment from "moment"; // Mostrar tiempo de notificacion
import { FaBell } from "react-icons/fa"; // Icono  campana
import "react-toastify/dist/ReactToastify.css"; ///Estilos

// Inicializa socket.io apuntando al backend
const socket = io('http://localhost:3000'); 

// Componente principal que recibe props
const Notificaciones = ({ userId, tipoUsuario }) => {
  // Estado para contar notificaciones no leídas
  const [contador, setContador] = useState(0);

  // Estado para almacenar la lista de notificaciones
  const [notis, setNotis] = useState([]);

  // Estado para mostrar/ocultar el panel desplegable de notificaciones
  const [mostrarLista, setMostrarLista] = useState(false);

  // Hook que se ejecuta al montar el componente
  useEffect(() => {
    // Registramos al usuario al socket (para que solo reciba lo que le corresponde)
    socket.emit('registrar_usuario', { userId, tipo: tipoUsuario });

    // Cuando llega una notificación del backend
    socket.on('nueva_notificacion', (data) => {
      // Verificamos si la notificación aplica para este usuario o tipo de usuario
      if (
        data.tipoUsuario === tipoUsuario ||
        data.tipoUsuario === 'ambos' ||
        data.usuarioId === userId
      ) {
        // Mostramos un toast arriba con el mensaje + tiempo relativo
        toast[data.tipo || "info"](`${data.mensaje} - ${moment(data.createdAt).fromNow()}`);
        
        // Aumentamos el contador de no leídas
        setContador(prev => prev + 1);

        // Agregamos la nueva notificación al principio de la lista
        setNotis(prev => [data, ...prev]);
      }
    });

    // Limpieza del socket al desmontar el componente
    return () => socket.disconnect();
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      
      {/* Ícono de campana de notificaciones */}
      <div onClick={() => setMostrarLista(!mostrarLista)} style={{ cursor: "pointer" }}>
        <FaBell size={24} />
        
        {/* Globito rojo con contador si hay notificaciones no leídas */}
        {contador > 0 && (
          <span style={{
            position: "absolute",
            top: -5,
            right: -5,
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "12px"
          }}>{contador}</span>
        )}
      </div>

      {/* Panel desplegable con la lista de notificaciones */}
      {mostrarLista && (
        <div style={{
          position: "absolute",
          top: "30px",
          right: 0,
          width: "250px",
          maxHeight: "300px",
          overflowY: "auto",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          zIndex: 999,
          borderRadius: "8px",
          padding: "10px"
        }}>
          {/* Si no hay notificaciones */}
          {notis.length === 0 ? (
            <p>No hay notificaciones nuevas</p>
          ) : (
            // Mostrar cada notificación con su mensaje y tiempo
            notis.map((n, idx) => (
              <div key={idx} style={{ marginBottom: "10px", fontSize: "14px" }}>
                <strong>{n.mensaje}</strong>
                <div style={{ fontSize: "12px", color: "gray" }}>
                  {moment(n.createdAt).fromNow()}
                </div>
                <hr />
              </div>
            ))
          )}
        </div>
      )}

      {/* Contenedor de toasts (popup superior derecho) */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Notificaciones;
