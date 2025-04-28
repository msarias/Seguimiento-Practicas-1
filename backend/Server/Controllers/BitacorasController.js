const Bitacoras = require('../Models/Bitacora');


// Obtener todas las bitácoras
const getAllBitacoras = async (req, res) => {
    const id_usuario = req.query.id_usuario;
  
    try {
      const bitacoras = await Bitacoras.findAll({
        where: { id_usuario }
      });
      res.json(bitacoras);
    } catch (error) {
      console.error('Error en getAllBitacoras:', error);
      res.status(500).json({ error: 'Error al obtener las bitácoras' });
    }
  };
// Obtener una bitácora por ID
const getBitacoraById = async (req, res) => {
    try {
        const { id } = req.params;
        const bitacora = await Bitacoras.findByPk(id);
        if (!bitacora) {
            return res.status(404).json({ error: 'Bitácora no encontrada' });
        }
        res.status(200).json(bitacora);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la bitácora' });
    }
};

const createBitacora = async (req, res) => {
    try {
      const { id_usuario, fecha } = req.body;
      const archivo = req.file?.filename;
  
      if (!id_usuario || !fecha || !archivo) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }
  
      // Buscar el aprendiz y su instructor
      const aprendiz = await Usuario.findByPk(id_usuario, {
        include: { model: Usuario, as: 'instructor' }
      });
  
      if (!aprendiz) {
        return res.status(404).json({ error: 'Aprendiz no encontrado' });
      }
  
      const id_instructor = aprendiz.instructor?.id;
  
      // Crear la bitácora incluyendo el id del instructor
      const nuevaBitacora = await Bitacoras.create({
        id_usuario,
        fecha,
        archivo,
        id_instructor,
      });
  
      res.status(201).json({ bitacora: nuevaBitacora });
    } catch (error) {
      console.error('Error al crear la bitácora:', error);
      res.status(500).json({ error: 'Error interno del servidor al crear la bitácora' });
    }
  };

// Actualizar una bitácora
const updateBitacora = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_bitacora, numero_bitacora } = req.body;
        const archivo = req.file ? req.file.filename : null;

        const bitacora = await Bitacoras.findByPk(id);
        if (!bitacora) {
            return res.status(404).json({ error: 'Bitácora no encontrada' });
        }

        await bitacora.update({ nombre_bitacora, numero_bitacora, archivo });

        res.status(200).json(bitacora);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la bitácora' });
    }
};

const aceptarBitacora = async (req, res) => {
    const { id } = req.params;

    try {
        const bitacora = await Bitacoras.findByPk(id);

        if (!bitacora) {
            return res.status(404).json({ error: 'Bitácora no encontrada' });
        }

        bitacora.estado = 'aceptada';
        bitacora.motivo = null; // limpia motivo si había uno anterior
        await bitacora.save();

        res.status(200).json({ mensaje: 'Bitácora aceptada con éxito', bitacora });
    } catch (error) {
        console.error('Error al aceptar bitácora:', error);
        res.status(500).json({ error: 'Error al aceptar la bitácora' });
    }
};

const rechazarBitacora = async (req, res) => {
    const { id } = req.params;
    const { motivo } = req.body;

    try {
        const bitacora = await Bitacoras.findByPk(id);

        if (!bitacora) {
            return res.status(404).json({ error: 'Bitácora no encontrada' });
        }

        bitacora.estado = 'rechazada';
        bitacora.motivo = motivo;
        await bitacora.save();

        res.status(200).json({ mensaje: 'Bitácora rechazada con éxito', bitacora });
    } catch (error) {
        console.error('Error al rechazar bitácora:', error);
        res.status(500).json({ error: 'Error al rechazar la bitácora' });
    }
};

// Eliminar una bitácora
const deleteBitacora = async (req, res) => {
    try {
        const { id } = req.params;

        const bitacora = await Bitacoras.findByPk(id);
        if (!bitacora) {
            return res.status(404).json({ error: 'Bitácora no encontrada' });
        }

        await bitacora.destroy();
        res.status(200).json({ message: 'Bitácora eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la bitácora' });
    }
};

module.exports = {
    getAllBitacoras,
    getBitacoraById,
    createBitacora,
    updateBitacora,
    deleteBitacora,
    rechazarBitacora,
    aceptarBitacora
};
