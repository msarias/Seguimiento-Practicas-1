const express = require('express');
const router = express.Router();
const Usuario = require('../Controllers/Usuario');

//Rutas
router.post('/', Usuario.crearUsuario);
router.get('/listarUsuarios', Usuario.obtenerUsuarios);
router.get('/:id', Usuario.obtenerUsuarioPorId);
router.put('/:id', Usuario.actualizarUsuario);
router.delete('/:id', Usuario.eliminarUsuario);
// router.get('/',UsuariosController.ObtenerAprendices);
// router.get('/', UsuariosController.ObtenerInstructores);

module.exports = router;