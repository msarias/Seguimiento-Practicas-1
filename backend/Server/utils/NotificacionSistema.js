const enviarNotificacion = require("../Sockets/Notificacion");

// ==================== SEGURIDAD / CUENTA ====================
exports.notificarCambioPassword = (io, usuarioId, tipoUsuario) => {
    enviarNotificacion({
      mensaje: "Tu contraseña ha sido actualizada con éxito.",
      tipoUsuario,
      usuarioId,
      tipo: "success",
      io,
    });
  };

  exports.notificarIntentosFallidos = (io, usuarioId, tipoUsuario) => {
    enviarNotificacion({
      mensaje: "Alguien intentó acceder a tu cuenta sin éxito.",
      tipoUsuario,
      usuarioId,
      tipo: "error",
      io,
    });
  };
  
  exports.notificarPrimerInicioSesion = (io, usuarioId) => {
    enviarNotificacion({
      mensaje: "¡Bienvenido! No olvides actualizar tu perfil.",
      tipoUsuario: "ambos",
      usuarioId,
      tipo: "info",
      io,
    });
  };
  
  // ==================== VISITAS ====================
exports.notificarNuevaVisita = (io, usuarioId, tipoUsuario, fecha) => {
    enviarNotificacion({
      mensaje: `Se ha agendado una visita para el ${fecha}.`,
      tipoUsuario,
      usuarioId,
      tipo: "info",
      io,
    });
  };
  
  exports.notificarCambioVisita = (io, usuarioId, tipoUsuario, nuevaFecha) => {
    enviarNotificacion({
      mensaje: `Tu visita fue reprogramada para el ${nuevaFecha}.`,
      tipoUsuario,
      usuarioId,
      tipo: "warning",
      io,
    });
  };
  
  exports.notificarCancelacionVisita = (io, usuarioId, fecha) => {
    enviarNotificacion({
      mensaje: `Tu visita del ${fecha} ha sido cancelada.`,
      tipoUsuario: "ambos",
      usuarioId,
      tipo: "error",
      io,
    });
  };
  
  // ==================== REPORTES / BITÁCORAS ====================
exports.notificarNuevoReporte = (io, usuarioId) => {
    enviarNotificacion({
      mensaje: "Has enviado un nuevo reporte. Revisión en curso.",
      tipoUsuario: "aprendiz",
      usuarioId,
      tipo: "info",
      io,
    });
  };
  
  exports.notificarReporteAprobado = (io, usuarioId) => {
    enviarNotificacion({
      mensaje: "Tu reporte ha sido aprobado por el instructor.",
      tipoUsuario: "aprendiz",
      usuarioId,
      tipo: "success",
      io,
    });
  };
  
  exports.notificarReporteRechazado = (io, usuarioId) => {
    enviarNotificacion({
      mensaje: "Tu reporte fue rechazado. Revisa los comentarios.",
      tipoUsuario: "aprendiz",
      usuarioId,
      tipo: "error",
      io,
    });
  };
  
  exports.notificarNuevaBitacora = (io, usuarioId) => {
    enviarNotificacion({
      mensaje: "Se ha registrado una nueva bitácora.",
      tipoUsuario: "instructor",
      usuarioId,
      tipo: "info",
      io,
    });
  };
  
  exports.notificarComentarioBitacora = (io, usuarioId, fecha) => {
    enviarNotificacion({
      mensaje: `Tu instructor comentó en tu bitácora del ${fecha}.`,
      tipoUsuario: "aprendiz",
      usuarioId,
      tipo: "info",
      io,
    });
  };
  
  // ==================== USUARIOS / EMPRESAS ====================
exports.notificarUsuarioCreado = (io, usuarioId, tipoUsuario) => {
    enviarNotificacion({
      mensaje: "Se ha creado tu cuenta con éxito.",
      tipoUsuario,
      usuarioId,
      tipo: "success",
      io,
    });
  };
  exports.notificarCambioEmpresa = (io, usuarioId) => {
    enviarNotificacion({
      mensaje: "Se actualizó la información de tu empresa asociada.",
      tipoUsuario: "aprendiz",
      usuarioId,
      tipo: "info",
      io,
    });
  };
  
