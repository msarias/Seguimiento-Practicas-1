const express = require('express');
const router = express.Router();
const Visita = require('../Controllers/Visita');

router.post('/', Visita.crearVisita);
router.get('/verVisitas', Visita.verVisitas);
router.put('/aceptar/:id', Visita.aceptarVisita);
router.put('/rechazar/:id', Visita.rechazarVisita);
router.put('/:id', Visita.actualizarVisita); // ← esta es la ruta para editar
router.delete('/:id', Visita.eliminarVisita);

module.exports = router;
