const express = require('express');
const router = express.Router();
const reportesController = require('../Controllers/reporteController');

router.get('/listarReportes', reportesController.getReportes);
router.get('/:id', reportesController.getReporteById);
router.post('/', reportesController.createReporte);
router.put('/:id', reportesController.updateReporte);
router.delete('/:id', reportesController.deleteReporte);

module.exports = router;
