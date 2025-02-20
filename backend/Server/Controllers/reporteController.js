const Reporte = require('../Models/reporteModel');

exports.createReporte = async (req, res) => {
    try{
        const {id_aprendiz, fecha, nombre} = req.body;
        const nuevoReporte = await Reporte.create({
            id_aprendiz, fecha, nombre
        });
        res.status(201).json(nuevoReporte);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};

exports.getReporteById = async (req, res) => {
    try{
        const {id} = req.params;
        const reporte = await Reporte.findByPk(id);
        if(!reporte){
            res.status(404).json({message: 'No existe el reporte'});
        }
        res.status(200).json(reporte);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};

exports.getReportes = async (req, res) => {
    try{
        const reportes = await Reporte.findAll();
        res.status(200).json(reportes);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};

exports.deleteReporte = async (req, res) => {
    try{
        const {id} = req.params;
        const reporte = await Reporte.findByPk(id);
        if(!reporte){
            res.status(404).json({message: 'El reporte no existe'});
        }
        reporte.destroy();
        res.status(200).json({message: 'Reporte eliminado'})
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.updateReporte = async (req, res) => {
    try{
        const {id} = req.params;
        const {id_aprendiz, fecha, nombre} = req.body;
        const reporte = await Reporte.findByPk(id);
        if(!reporte){
            res.status(404).json({message: 'El reporte no exite'});
        }
        reporte.update({id_aprendiz, fecha, nombre});
        res.status(200).json({message: 'Reporte actualizado'});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};
