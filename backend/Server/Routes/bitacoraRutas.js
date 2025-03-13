const express = require('express');
const router = express.Router();
const bitacorasController = require('../Controllers/BitacorasController');

//Rutas

router.get('/', bitacorasController.getAllBitacoras);
router.get('/:id', bitacorasController.getBitacoraById);
router.post('/', bitacorasController.createBitacora);
router.put('/:id', bitacorasController.updateBitacora);
router.delete('/:id', bitacorasController.deleteBitacora);


module.exports = router;



