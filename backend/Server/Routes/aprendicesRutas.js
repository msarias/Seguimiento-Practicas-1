const express = require('express');
const router = express.Router();
const aprendicesController = require('../Controllers/aprendicesController');

//Rutas

router.get('/aprendices', aprendicesController.Obteneraprendices);//Obtener aprendices activos
router.get('/aprendices/:id', aprendicesController.ObteneraprendicesID);//Obtener aprendiz por su id
router.post('/aprendices', aprendicesController.Crearaprendiz);//Crear aprendiz

//router.put('/aprendices/:id', aprendicesController.ActualizaraprendizID);//Atualiar aprendiz por id
//router.delete('/aprendices/:id', aprendicesController.EliminaraprendizID)//Eliminar aprendiz por id

router.put('/aprendices/:id', aprendicesController.ActualizaraprendizID);//Atualiar aprendiz por id
router.delete('/aprendices/:id', aprendicesController.EliminaraprendizID)//Eliminar - desactivar aprendiz por id

module.exports = router;


//router.get('/aprendices',autentificcion.rol(['Instructor',]), aprendicesController.Obteneraprendices);//Obtener todos los aprendices
