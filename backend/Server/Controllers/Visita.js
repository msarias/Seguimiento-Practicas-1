const Visita = require('../Models/Visita');

exports.crearVisita = async (req, res) => {
    try {
        const { direccion, tipo, fecha } = req.body;
        const nuevaVisita = await Visita.create({ direccion, tipo, fecha });
        res.status(201).json(nuevaVisita)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
};

exports.verVisitaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const visita = await Visita.findByPk(id);
        if (!visita) {
            res.status(404).json({ error: 'Visita no encontrada' });
        }
        res.status(200).json(visita);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.verVisitas = async (req, res) => {
    try {
        const visita = await Visita.findAll();
        res.status(200).json(visita);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.actualizarVisita = async (req, res) => {
    try {
        const { id } = req.params;
        const { direccion, tipo, fecha } = req.body;
        const visita = await Visita.findByPk(id);
        if (!visita) {
            res.status(404).json({ error: 'Visita no encontrada' });
        }
        visita.update({ direccion, tipo, fecha });
        res.status(200).json({ visita });
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
};

exports.eliminarVisita = async (req, res) => {
    try {
        const { id } = req.params;
        const visita = await Visita.findByPk(id);
        if (!visita) {
            res.status(404).json({ error: 'Visita no encontrada' });
        }
        await visita.destroy();
        res.status(201).json({ message: 'Visita eliminada correctamente' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};