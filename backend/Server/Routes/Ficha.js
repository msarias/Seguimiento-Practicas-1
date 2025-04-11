const express = require('express');
const router = express.Router();
const fichaController = require('../Controllers/Ficha');

// Obtener todas las fichas (solo códigos y nombre del programa)
router.get('/', fichaController.obtenerFichas);

// Obtener aprendices de una ficha específica por código
router.get('/:codigo/aprendices', fichaController.obtenerAprendicesPorFicha);

module.exports = router;
