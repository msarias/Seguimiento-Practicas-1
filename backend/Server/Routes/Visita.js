const express = require('express');
const router = express.Router();
const Visita = require('../Controllers/Visita');

router.post('/', Visita.crearVisita);
router.get('/verVisitas', Visita.verVisitas);
// PUT /api/visitas/:id
router.put("/visitas/:id", async (req, res) => {
    const { id } = req.params;
    const { fecha, tipo, direccion } = req.body;
    try {
      await pool.query(
        "UPDATE visitas SET fecha = ?, tipo = ?, direccion = ? WHERE id = ?",
        [fecha, tipo, direccion, id]
      );
      res.json({ message: "Visita actualizada correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar la visita" });
    }
  });
  
router.put('/:id', Visita.actualizarVisita);
router.delete('/:id', Visita.eliminarVisita);

module.exports = router;
