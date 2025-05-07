const { Notificacion } = require('../models');

exports.crearNotificacion = async (req, res) => {
  const { mensaje, id_usuario, tipo } = req.body;

  try {
    const nuevaNotificacion = await Notificacion.create({
      mensaje,
      usuarioId,
      tipo,
    });

    // Emitir un evento o hacer algo cuando la notificación se cree
    // Por ejemplo, emitir una señal para que el cliente recargue las notificaciones
    res.status(201).json(nuevaNotificacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la notificación' });
  }
};

exports.obtenerNotificaciones = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const notificaciones = await Notificacion.findAll({
      where: { id_usuario },
      order: [['fecha', 'DESC']], // Ordenar por fecha (más reciente primero)
    });

    res.status(200).json(notificaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las notificaciones' });
  }
};

exports.actualizarEstadoNotificacion = async (req, res) => {
  const { id } = req.params;

  try {
    const notificacion = await Notificacion.findByPk(id);

    if (!notificacion) {
      return res.status(404).json({ error: 'Notificación no encontrada' });
    }

    notificacion.estado = 'leida';
    await notificacion.save();

    res.status(200).json(notificacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el estado de la notificación' });
  }
};


