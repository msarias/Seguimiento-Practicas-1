//SEGURUDAD - CUENTA

exports.notificarCambioPassword = (io, usuarioId, tipoUsuario) => {
  crearYEmitirNotificacion({
    mensaje: "Tu contraseña ha sido actualizada con éxito.",
    tipoUsuario,
    usuarioId,
    tipo: "success",
    io,
  });
};

exports.notificarCambioCorreo = (io, usuarioId, tipoUsuario) => {
  crearYEmitirNotificacion({
    mensaje: "Tu correo electrónico ha sido actualizado.",
    tipoUsuario,
    usuarioId,
    tipo: "info",
    io,
  });
};

exports.notificarAccesoNoAutorizado = (io, usuarioId, tipoUsuario) => {
  crearYEmitirNotificacion({
    mensaje: "Se detectó un intento de acceso no autorizado a tu cuenta.",
    tipoUsuario,
    usuarioId,
    tipo: "error",
    io,
  });
};

//VISITAS
exports.notificarVisitaAgendada = (io, usuarioId, tipoUsuario) => {
  crearYEmitirNotificacion({
    mensaje: "Tienes una nueva visita agendada. Revisa tu calendario.",
    tipoUsuario,
    usuarioId,
    tipo: "info",
    io,
  });
};

exports.notificarConflictoHorario = (io, usuarioId, tipoUsuario) => {
  crearYEmitirNotificacion({
    mensaje: "Conflicto de horario detectado al agendar una visita.",
    tipoUsuario,
    usuarioId,
    tipo: "warning",
    io,
  });
};

exports.notificarVisitaCancelada = (io, usuarioId, tipoUsuario) => {
  crearYEmitirNotificacion({
    mensaje: "Una visita que tenías agendada ha sido cancelada.",
    tipoUsuario,
    usuarioId,
    tipo: "warning",
    io,
  });
};

//REPORTE - BITACORAS
exports.notificarNuevoReporte = (io, usuarioId, tipoUsuario) => {
  crearYEmitirNotificacion({
    mensaje: "Se ha generado un nuevo reporte.",
    tipoUsuario,
    usuarioId,
    tipo: "info",
    io,
  });
};

exports.notificarObservacionEnBitacora = (io, usuarioId, tipoUsuario) => {
  crearYEmitirNotificacion({
    mensaje: "Tienes una nueva observación en tu bitácora.",
    tipoUsuario,
    usuarioId,
    tipo: "warning",
    io,
  });
};

//USUARIO EMPRESAS
exports.notificarNuevoUsuario = (io, usuarioId, tipoUsuario) => {
  crearYEmitirNotificacion({
    mensaje: "Se ha registrado un nuevo usuario en el sistema.",
    tipoUsuario,
    usuarioId,
    tipo: "info",
    io,
  });
};

exports.notificarUsuarioEliminado = (io, usuarioId, tipoUsuario) => {
  crearYEmitirNotificacion({
    mensaje: "Un usuario ha sido eliminado del sistema.",
    tipoUsuario,
    usuarioId,
    tipo: "warning",
    io,
  });
};