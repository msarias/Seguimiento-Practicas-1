const express = require('express');
const router = express.Router();
const bitacorasController = require('../Controllers/BitacorasController');

//Rutas

router.get('/bitacoras', bitacorasController.ObtenerBitacora);//Obtener todos los aprendices
router.get('/bitacoras/:id', bitacorasController.ObtenerBitacoraID);//Obtener aprendiz por su ID
router.post('/bitaco', bitacorasController.CrearBitacora);//Crear aprendiz
router.delete('/bitacoras/:id',bitacorasController.EliminarBitacoraID);//Eliminar bitacora por su ID
router.put('/bitacoras/:id',bitacorasController.ActualizarBitacoraID);//Actualizar bitacora por su ID

module.exports = router;



