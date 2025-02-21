const express = require('express');
const router = express.Router();
const aprendicesController = require('../Controllers/UsuariosController');

//Rutas aprendices

router.post('/aprendices', aprendicesController.CrearUsuario);//Crear aprendiz
router.get('/aprendices', aprendicesController.ObtenerAprendices);//Obtener aprendices activos
router.get('/aprendices/:id', aprendicesController.ObtenerUsuarioByID);//Obtener aprendiz por su id
router.put('/aprendices/:id', aprendicesController.ActualizarAprendizID);//Atualiar aprendiz por id
router.delete('/aprendices/:id', aprendicesController.EliminarAprendizID)//Eliminar - desactivar aprendiz por id
module.exports = router;


//router.get('/aprendices',autentificcion.rol(['Instructor',]), aprendicesController.Obteneraprendices);//Obtener todos los aprendices
