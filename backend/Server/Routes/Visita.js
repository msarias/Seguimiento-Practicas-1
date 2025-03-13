const express = require('express');
const router = express.Router();
const Visita = require('../Controllers/Visita');

router.get('/verVisitas', Visita.verVisitas);
router.get('/:id', Visita.verVisitaPorId);
router.post('/', Visita.crearVisita);
router.put('/:id', Visita.actualizarVisita);
router.delete('/:id', Visita.eliminarVisita);

module.exports = router;
