const express = require('express');
const router = express.Router();
const Visita = require('../Controllers/Visita');

router.post('/', Visita.crearVisita);
router.get('/verVisitas', Visita.verVisitas);
router.get('/:id', Visita.verVisitaPorId); // Añadida para obtener visita por ID
router.put('/aceptar/:id', Visita.aceptarVisita);
router.put('/rechazar/:id', Visita.rechazarVisita);
router.put('/:id', Visita.actualizarVisita); // Ruta para editar
router.delete('/:id', Visita.eliminarVisita);

module.exports = router;
