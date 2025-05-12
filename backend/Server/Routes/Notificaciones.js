const express = require('express');
const router = express.Router();
const NotificacionController = require('../Controllers/NotificacionController');

// Crear notificación
router.post('/', NotificacionController.crearNotificacion);

// Obtener notificaciones por usuario
router.get('/usuario/:id_usuario', NotificacionController.obtenerNotificaciones);

// Actualizar (marcar como leída o cambiar estado)
router.put('/:id', NotificacionController.actualizarEstadoNotificacion);

router.delete('/:id', NotificacionController.eliminarNotificacion);

module.exports = router;
