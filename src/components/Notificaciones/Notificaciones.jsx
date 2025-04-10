import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { io } from "socket.io-client";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";

const socket = io('http://localhost:3000'); // Cambia si usas otro host

const Notificaciones = ({ userId, tipoUsuario }) => {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    socket.emit('registrar_usuario', { userId, tipo: tipoUsuario });

    socket.on('nueva_notificacion', (data) => {
      if (
        data.tipoUsuario === tipoUsuario ||
        data.tipoUsuario === 'ambos' ||
        data.usuarioId === userId
      ) {
        toast[data.tipo || "info"](`${data.mensaje} - ${moment(data.createdAt).fromNow()}`);
        setContador(prev => prev + 1);
      }
    });

    return () => socket.disconnect();
  }, []);

  return (
    <>
      <div>🔔 Notificaciones {contador > 0 && <span>({contador})</span>}</div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
};

export default Notificaciones;
