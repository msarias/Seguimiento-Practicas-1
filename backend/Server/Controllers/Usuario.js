const Usuario = require('../Models/Usuario');
const bcrypt = require('bcryptjs');

// Crear un usuario (aprendiz o instructor)
exports.crearUsuario = async (req, res) => {
    try {
        const { nombres, apellidos, correo, rol, id_empresa, contraseña, identificacion } = req.body;

        let hashRounds = 1;
        let hashedPassword = await bcrypt.hash(contraseña, hashRounds);

        const nuevoUsuario = await Usuario.create({ nombres, apellidos, correo, rol, id_empresa, contraseña: hashedPassword, identificacion });

        res.status(201).send(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

// Obtener todos los usuarios (sin importar su rol)
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        if (usuarios.length === 0) {
            return res.status(404).json({ message: 'No hay usuarios registrados' });
        }
        res.status(200).json({ usuarios });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Obtener aprendices con paginación
/* exports.ObtenerAprendices = async (req, res) => {
    try {
        let { page, size } = req.query;
        page = page ? parseInt(page) : 1;
        size = size ? parseInt(size) : 10;
        const offset = (page - 1) * size;
        const limit = size;

        const aprendices = await Aprendices.findAndCountAll({
            where: { activo: true },
            limit,
            offset
        });

        res.status(200).json({
            total: aprendices.count,
            totalPages: Math.ceil(aprendices.count / size),
            data: aprendices.rows
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; */

// Obtener instructores con paginación
/* exports.ObtenerInstructores = async (req, res) => {
    try {
        let { page, size } = req.query;
        page = page ? parseInt(page) : 1;
        size = size ? parseInt(size) : 10;
        const offset = (page - 1) * size;
        const limit = size;

        const instructores = await Instructores.findAndCountAll({
            limit,
            offset
        });

        res.status(200).json({
            total: instructores.count,
            totalPages: Math.ceil(instructores.count / size),
            data: instructores.rows
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; */

// Obtener usuario por ID (ya sea aprendiz o instructor)
exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no existe' });
        }

        // Buscar en aprendices o instructores según el rol
        // if (usuario.rol === 'aprendiz') {
        //     const aprendiz = await Aprendices.findOne({ where: { id_usuario: id } });
        //     return res.status(200).json({ usuario, aprendiz });
        // }

        // if (usuario.rol === 'instructor') {
        //     const instructor = await Instructores.findOne({ where: { id_usuario: id } });
        //     return res.status(200).json({ usuario, instructor });
        // }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombres, apellidos, correo, rol, id_empresa, contraseña: hashedPassword, identificacion } = req.body;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

        await usuario.update({ nombres, apellidos, correo, rol, id_empresa, contraseña: hashedPassword, identificacion });

        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Marcar usuario como inactivo (eliminar lógicamente)
/* exports.EliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await Usuarios.findByPk(id);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        usuario.activo = false;
        await usuario.save();

        res.status(200).json({ message: 'Usuario marcado como inactivo' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; */

//Elimnar  desactivar aprendiz
exports.eliminarUsuario = async (req, res) => {

    setTimeout(async () => {
        try {
            const { id } = req.params;
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            await usuario.destroy();
            res.status(200).json({ message: 'usuario eliminado' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }, 4000);
};


//Actualizar aprendices
/* exports.ActualizarAprendizID = async(req, res) => {
    try{
        const [filasActualizadas] = await Aprendiz.update(req.body,
            {where: {id: req.params.id}
        }); if (!filasActualizadas)

            return res.status(404).json({ error: 'Aprendiz no encontrado'});

            res.status(200).json({message: 'Aprendiz Actualizado'});
    }catch (error){
        res.status(500).json({error:error.message})
    }
}; */