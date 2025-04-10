const Notificacion = require('../Models/Notificacion');

exports.crearNotificacion = async(req, res)=>{
    try{
        const{
            mensaje,
            tipoUsuario,
            usuarioId,
            enviarCorreo,
            tipo
        } = req.body

        const nueva = await Notificacion.create({
            mensaje,
            tipoUsuario,
            usuarioId,
            enviarCorreo,
            tipo,
        });

        if(req.io){
            if(tipoUsuario == "ambos"){
                req.io.emit("nueva_notificacion",nueva);
            }else{
                req.io.to(`${tipoUsuario}_${usuarioId}`).emit('nueva_notificacion', nueva);
            }
        }

        //para poder enviar alcorreo
        res.status(201).json(nueva);
    }catch(error){
        res.status(500).json({error:"Error al crear notificacion"})
    }
}