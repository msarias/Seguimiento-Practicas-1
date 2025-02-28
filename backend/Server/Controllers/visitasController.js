const Visita = require('../Models/Visitas');

exports.CrearVisita = async(req, res) => {
    try{
        const {direccion, fecha, hora, tipo_visita, herramienta} = req.body;

        const visita = await Visita.create({direccion, fecha, hora, tipo_visita, herramienta});
        res.status(201).json(visita)
    }catch (error){
        res.status(500).jsson({error: error.message})
    }
};

exports.ActualizarVisitaID = async (req, res)=> {
    try{
        const [visita] = await Visita.update(req.body, {where: {id:req.params.id}});
        if(!visita) 
            return
        res.status(404).json({error: 'Visita no encontrada'});
        res.status(200).json({message: 'Visita actualizada correctamente'});
}catch (error){
    res.status(500).jsson({error: error.message})
}

};

exports.ObtenerVisitas = async (req, res) =>{
    try{
        const visita = await Visita.findAll();
        res.staus(200).json(visita);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

exports.ObtenerVisitaID = async (req, res) => {
    try{
        const visita = await Visita.findById(req.params.id);
        if(!visita) return 
        res.status(404).json({error: 'Visita no encontrada'});
        res.status(200).json(visita);
    }catch (error){
        res.status(500).json({error: error.message});
    }
};

exports.EliminarVisitaID = async (req, res) =>{
    try{
        const visita = await Visita.destroy({where:{id:req.params.id}});
        if(!visita) return
        res.status(200).json({error:'Visita no encontrada'});
        res.status(200).json({message: 'Vista eliminada correctamente'});
    }catch (error){
        res.status(500).json({error: error.message});
    }
};