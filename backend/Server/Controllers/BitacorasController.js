const Bitacoras = require('../Models/Bitacora');
const { notificarNuevaBitacora } = require("../utils/NotificacionSistema");

// Obtener todas las bitácoras
const getAllBitacoras = async (req, res) => {
    try {
        const bitacoras = await Bitacoras.findAll();
        res.status(200).json(bitacoras);
    } catch (error) {
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

// Crear una nueva bitácora
const createBitacora = async (req, res) => {
    try {
        const { id_usuario, fecha, codigo} = req.body;
        const nuevaBitacora = await Bitacoras.create({
            id_usuario,
            fecha,
            // archivo,
            codigo
        });
         //Notificacion

         const io = req.app.get("io");
         notificarNuevaBitacora(io, nuevaBitacora);

        res.status(201).json(nuevaBitacora);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una bitácora
const updateBitacora = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_bitacora, numero_bitacora, archivo } = req.body;

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
    deleteBitacora
};