const express = require('express');
const router = express.Router();
const NotificacionController = require('../Controllers/NotificacionController');

router.post('/crear', async (req, res) => {
    try {
      const { mensaje, id_usuario, tipo } = req.body;
      const nueva = await Notificacion.create({ mensaje, id_usuario, tipo });
      res.json(nueva);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear notificación' });
    }
  });

// Obtener notificaciones por usuario
router.get('/usuario/:id', async (req, res) => {
    try {
      const notificaciones = await Notificacion.findAll({
        where: { id_usuario: req.params.id },
        order: [['createdAt', 'DESC']],
      });
      res.json(notificaciones);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener notificaciones' });
    }
  });
  
  // Marcar como leída
  router.patch('/:id', async (req, res) => {
    try {
      const { estado } = req.body;
      await Notificacion.update({ estado }, { where: { id: req.params.id } });
      res.json({ mensaje: 'Notificación actualizada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar notificación' });
    }
  });

router.put('/:id/notificacion', NotificacionController.actualizarEstadoNotificacion);

module.exports = router;
