const express = require('express');
const router = express.Router();
const UsuariosController = require('../Controllers/UsuariosController');

//Rutas

router.post('/', UsuariosController.CrearUsuario);
router.get('/listarUsuarios', UsuariosController.ObtenerUsuarios);
router.get('/:id', UsuariosController.ObtenerUsuarioByID);
router.get('/',UsuariosController.ObtenerAprendices);
router.get('/', UsuariosController.ObtenerInstructores);
router.put('/', UsuariosController.ActualizarUsuario);
router.delete('/', UsuariosController.EliminarUsuario);

module.exports = router