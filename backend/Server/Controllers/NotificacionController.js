const Notificacion = require('../Models/Notificacion');

exports.crearNotificacion = async (req, res) => {
  const { mensaje, usuarioId, tipo } = req.body;

  try {
    const nuevaNotificacion = await Notificacion.create({
      mensaje,
      usuarioId,
      tipo,
    });

    res.status(201).json(nuevaNotificacion);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la notificación', error });
  }
};

exports.obtenerNotificaciones = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const notificaciones = await Notificacion.findAll({
      where: { usuarioId: id_usuario },
      order: [['fecha', 'DESC']],
    });

    res.status(200).json(notificaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las notificaciones', error });
  }
};

exports.actualizarEstadoNotificacion = async (req, res) => {
  const { id } = req.params;

  try {
    const notificacion = await Notificacion.findByPk(id);

    if (!notificacion) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }

    notificacion.estado = 'leida';
    await notificacion.save();

    res.status(200).json(notificacion);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el estado', error });
  }
};
