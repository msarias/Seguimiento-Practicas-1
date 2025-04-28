const express = require('express');
const router = express.Router();
const Usuario = require('../Controllers/Usuario');

//Rutas
router.post('/', Usuario.crearUsuario);
router.put('/:id', Usuario.actualizarUsuario);
router.put("/asignarAprendiz", async (req, res) => {
    const { id_aprendiz, id_instructor } = req.body;
  
    try {
      // Asignamos al aprendiz el ID del instructor
      await Usuario.update(
        { id_instructor },
        { where: { id: id_aprendiz } }
      );
  
      res.json({ message: "Aprendiz asignado correctamente al instructor." });
    } catch (error) {
      console.error("Error al asignar aprendiz:", error);
      res.status(500).json({ error: "Error al asignar aprendiz." });
    }
  });
  
router.delete('/:id', Usuario.eliminarUsuario);
router.get('/listarUsuarios', Usuario.obtenerUsuarios);
router.get('/:id', Usuario.obtenerUsuarioPorId);
router.get('/aprendices', Usuario.obtenerAprendices);
// router.get('/',UsuariosController.ObtenerAprendices);
// router.get('/', UsuariosController.ObtenerInstructores);

module.exports = router;