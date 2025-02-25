// const { Certificado } = require('../Models');
const Certificados = require('../Models/Certificados');


//Crear un certificado nuevo
const createCertificado = async (req, res) => {
    try {
        const {id_aprendiz, fecha, nombre, estado} = req.body;
        const nuevoCertificado = await Certificados.create({
            id_aprendiz,
            fecha,
            nombre,
            estado
        });
        res.status(201).json(nuevoCertificado);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el certificado' });
    }
};


//Actualizar certificados
const updateCertificado = async (req, res) => {
    try {
        const { id } = req.params.id;
        const { id_aprendiz, fecha, nombre, estado} = req.body

        const certificado = await Certificados.findByPk(id);
                if (!certificado) {
                    return res.status(404).json({ error: 'Certificado no encontrado' });
                }
        
                await Certificados.update({ id_aprendiz, fecha, nombre, estado });
        
                res.status(200).json(certificado);
    }catch (error) {
        res.status(500).json({ error: 'Error al actualizar el certificado' });
    }
};

// Obtener todas los Certificados
const getAllCertificados = async (req, res) => {
    try {
        const certificados = await Certificados.findAll();
        res.status(200).json(certificados);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los certificados' });
    }
};

// Obtener un certificado por ID
const getCertificadoById = async (req, res) => {
    try {
        const { id } = req.params.id;
        const certificado = await Certificados.findByPk(id);
        if (!certificado) {
            return res.status(404).json({ error: 'Certificado no encontrado' });
        }
        res.status(200).json(certificado);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el certificado' });
    }
};

const deleteCertificadoById = async (req, res) => {
    try{
        const {id} = req.params.id;
        await Certificados.destroy({where: {id: id}});
        
        const certificado = await Certificados.findByPk(id);
        if(certificado === null){
            res.status(200).json({message: 'Reporte eliminado'})
        }
        res.status(404).json({message: 'El reporte no existe o no encontro'});
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    createCertificado,
    updateCertificado,
    getAllCertificados,
    getCertificadoById,
    deleteCertificadoById
}