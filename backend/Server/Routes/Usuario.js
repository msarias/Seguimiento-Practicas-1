const express = require('express');
const router = express.Router();
const Usuario = require('../Controllers/Usuario');

//Rutas
router.post('/', Usuario.crearUsuario);
router.put('/:id', Usuario.actualizarUsuario);
router.delete('/:id', Usuario.eliminarUsuario);
router.get('/listarUsuarios', Usuario.obtenerUsuarios);
router.get('/:id', Usuario.obtenerUsuarioPorId);
// router.get('/',UsuariosController.ObtenerAprendices);
// router.get('/', UsuariosController.ObtenerInstructores);

module.exports = router;