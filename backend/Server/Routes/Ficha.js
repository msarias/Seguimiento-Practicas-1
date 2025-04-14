const express = require('express');
const router = express.Router();
const { obtenerFichas } = require('../Controllers/Ficha'); // Asegúrate de la ruta

router.get('/', obtenerFichas);

module.exports = router;
