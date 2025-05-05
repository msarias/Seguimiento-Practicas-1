const Visita = require('../Models/Visita');

exports.crearVisita = async (req, res) => {
  try {
    const { direccion, tipo, fecha } = req.body;

    if (!direccion || !tipo || !fecha) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const nuevaVisita = await Visita.create({ direccion, tipo, fecha });
    res.status(201).json({ nuevaVisita });

  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message || 'Error al crear la visita',
        stack: error.stack, // Si es necesario para depuración
      }
    });
  }
};


/* exports.verVisitaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const visita = await Visita.findByPk(id);

    if (!visita) {
      return res.status(404).json({ error: 'La visita no existe' });
    }

    res.status(200).json({ visita });
  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message || 'Error al obtener la visita',
        stack: error.stack,
      }
    });
  }
}; */

exports.verVisitas = async (req, res) => {
  try {
    const visitas = await Visita.findAll();
    res.status(200).json({ visitas });
  } catch (error) {
    console.error("Error al obtener visitas:", error);  // Log del error
    res.status(500).json({ error: "Error interno del servidor", details: error.message });  // Detalles del error
  }
};

exports.actualizarVisita = async (req, res) => {
  try {
    const { id } = req.params;
    const { direccion, tipo, fecha } = req.body;

    // Validación de campos
    if (!direccion || !tipo || !fecha) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const visita = await Visita.findByPk(id);
    if (!visita) {
      return res.status(404).json({ error: 'La visita no existe' });
    }

    await visita.update({ direccion, tipo, fecha });
    res.status(200).json({ message: 'Visita actualizada' });
  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message || 'Error al actualizar la visita',
        stack: error.stack,
      }
    });
  }
};

exports.eliminarVisita = async (req, res) => {
  try {
    const { id } = req.params;
    const visita = await Visita.findByPk(id);

    if (!visita) {
      return res.status(404).json({ error: 'La visita no existe' });
    }

    await visita.destroy();
    res.status(204).json({ message: 'Visita eliminada' });
  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message || 'Error al eliminar la visita',
        stack: error.stack,
      }
    });
  }
};

exports.aceptarVisita = async (req, res) => {
  try {
    const visita = await Visita.findByPk(req.params.id);
    if (!visita) return res.status(404).json({ message: "Visita no encontrada" });

    visita.estado = "aceptada";
    await visita.save();
    res.status(200).json({ message: "Visita aceptada" });
  } catch (err) {
    res.status(500).json({
      error: {
        message: 'Error al aceptar la visita',
        stack: err.stack,
      }
    });
  }
};

exports.rechazarVisita = async (req, res) => {
  const { id } = req.params;
  const { motivo } = req.body;

  try {
    const visita = await Visita.findByPk(id);
    if (!visita) return res.status(404).json({ message: "Visita no encontrada" });

    visita.estado = "rechazada";
    visita.motivo = motivo; // Guardar motivo del rechazo
    await visita.save();

    res.status(200).json({ message: "Visita rechazada con motivo" });
  } catch (error) {
    console.error("Error al rechazar visita:", error);
    res.status(500).json({
      error: {
        message: 'Error al rechazar la visita',
        stack: error.stack,
      }
    });
  }
};