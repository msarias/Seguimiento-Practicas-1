const Aprendiz = require('../Models/index');
const aprendicesRutas = require('../Routes/aprendicesRutas');

//Crear Aprendiz

//Obtener todos los aprendices
exports.Obteneraprendices = async (req, res) => {
    try {
        const aprendices = await Aprendiz.findAll();
        // Verificar si hay aprendices
        if (!aprendices) {
            return res.status(404).json({ message: 'No se encontraron aprendices' })
        }
        return res.status(200).json(aprendices);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};
//Obtener aprendices con ID
exports.ObteneraprendicesID = async (req, res) => {
    try {
        const { id } = req.params;
        const aprendiz = await Aprendiz.findByPk(id);
        if (!aprendiz) {
            return res.status(404).json({ message: 'Aprendiz no encontrado' });
        }
        return res.status(200).json(aprendiz);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//Crear un nuevo aprendiz
exports.Crearaprendiz = async (req, res) => {
    try {
        const { id_usuario, id_empresa, id_reporte } = req.body;
        const nuevoAprendiz = await Aprendiz.create({ id_usuario, id_empresa, id_reporte });
        return res.status(201).json(nuevoAprendiz);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};
 