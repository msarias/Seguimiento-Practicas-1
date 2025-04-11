const Notificacion = require("../Models/Notificacion");

const crearYEmitirNotificacion = async ({
  mensaje,
  tipoUsuario,
  usuarioId,
  enviarCorreo = false,
  tipo = "info",
  io
}) => {
  try {
    const noti = await Notificacion.create({
      mensaje,
      tipoUsuario,
      usuarioId,
      enviarCorreo,
      tipo,
    });

    if (io) {
      if (tipoUsuario === "ambos") {
        io.emit("nueva_notificacion", noti);
      } else {
        io.to(`${tipoUsuario}_${usuarioId}`).emit("nueva_notificacion", noti);
      }
    }

    return noti;
  } catch (err) {
    console.error("Error al crear notificación:", err.message);
    throw err;
  }
};

module.exports = { crearYEmitirNotificacion };
