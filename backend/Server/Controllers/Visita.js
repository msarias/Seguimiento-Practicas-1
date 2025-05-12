const Visita = require('../Models/Visita');
const Notificacion = require('../Models/Notificacion');  // 👈🏽 Agrega esta línea
const Usuario = require('../Models/Usuario'); // 👈🏽 Necesitamos traer el modelo de Usuario

exports.crearVisita = async (req, res) => {
  try {
    const { direccion, tipo, fecha, aprendiz_id } = req.body;

    if (!direccion || !tipo || !fecha || !aprendiz_id) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const nuevaVisita = await Visita.create({ 
      direccion, 
      tipo, 
      fecha, 
      estado: 'pendiente',
      aprendiz_id 
    });

    const aprendiz = await Usuario.findByPk(aprendiz_id);
    if (!aprendiz) {
      return res.status(404).json({ message: 'Aprendiz no encontrado' });
    }

    const nombreAprendiz = aprendiz.nombres;
    const apellidoAprendiz = aprendiz.apellidos;

    // 👇🏽 Buscamos a todos los usuarios con rol 'instructor'
    const instructores = await Usuario.findAll({ where: { rol: 'instructor' } });

    // 👇🏽 Creamos una notificación para cada instructor
    for (const instructor of instructores) {
      await Notificacion.create({
        mensaje: `Nuevo agendamiento de visita por el aprendiz: ${nombreAprendiz} ${apellidoAprendiz}`,
        id_usuario: instructor.id, // 👈🏽 Aquí enviamos la notificación al instructor
        tipo: 'visita'
      });
    }

    res.status(201).json({ nuevaVisita });

  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message || 'Error al crear la visita',
        stack: error.stack,
      }
    });
  }
};


exports.verVisitaPorId = async (req, res) => {
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
};

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
    // Obtener la visita
    const visita = await Visita.findByPk(id);
    if (!visita) return res.status(404).json({ message: "Visita no encontrada" });

    // Actualizar estado de la visita a 'rechazada' y guardar el motivo
    visita.estado = "rechazada";
    visita.motivo = motivo;
    await visita.save();

    // Formatear la fecha
    const fechaFormateada = visita.fecha.toISOString().split("T")[0]; // 'YYYY-MM-DD'

    // Crear la notificación para el aprendiz
    const mensaje = `Tu visita del ${fechaFormateada} fue rechazada. Motivo: ${motivo}`;
    const id_usuario = visita.aprendiz_id;  // Obtener el ID del aprendiz asociado a la visita

    const nuevaNotificacion = await Notificacion.create({
      mensaje,
      id_usuario,
      estado: "pendiente", // Estado inicial    
    });

    res.status(200).json({ message: "Visita rechazada con motivo y notificación creada", data: nuevaNotificacion });
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
