const Certificados = require('../Models/Certificado');

exports.crearCertificado = async (req, res) => {
    try {
        const { id_usuario, fecha, nombre, estado } = req.body;
        const nuevoCertificado = await Certificados.create({
            id_usuario,
            fecha,
            nombre,
            estado
        });
        res.status(201).json(nuevoCertificado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.actualizarCertificado = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_usuario, fecha, nombre, estado } = req.body;

        const certificado = await Certificados.findByPk(id);
        if (certificado) {
            await certificado.update({ id_usuario, fecha, nombre, estado });
            res.status(200).json({ certificado });
        }
        res.status(404).json({ message: 'No existe el certificado' });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor', message: error.message });
    }
};


exports.verCertificados = async (req, res) => {
    try {
        const certificados = await Certificados.findAll();
        res.status(200).json(certificados);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los certificados' });
    }
};

exports.verCertificadoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const certificado = await Certificados.findByPk(id);
        if (certificado) {
            return res.status(200).json({ certificado });
        }
        res.status(404).json(error.message);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el certificado' });
    }
};

exports.eliminarCertificadoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const certificado = await Certificados.findByPk(id);

        if (certificado) {
            await certificado.destroy(id);
            res.status(200).json({ message: 'Certificado eliminado' })
        }
        res.status(404).json({ message: 'El certificado no existe' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
