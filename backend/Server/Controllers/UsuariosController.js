const { Usuarios, Aprendices, Instructores } = require('../models/usuariosModel');

// Crear un usuario (aprendiz o instructor)
exports.CrearUsuario = async (req, res) => {
    try {
        const { nombre, correo, contraseña, rol, id_empresa, id_reporte, especialidad } = req.body;

        // Crear el usuario base
        const nuevoUsuario = await Usuarios.create({ nombre, correo, contraseña, rol });

        // Si es aprendiz, creamos su entrada en la tabla de aprendices
        if (rol === 'aprendiz') {
            const nuevoAprendiz = await Aprendices.create({
                id_usuario: nuevoUsuario.id,
                id_empresa,
                id_reporte
            });
            return res.status(201).json({ usuario: nuevoUsuario, aprendiz: nuevoAprendiz });
        }

        // Si es instructor, creamos su entrada en la tabla de instructores
        if (rol === 'instructor') {
            const nuevoInstructor = await Instructores.create({
                id_usuario: nuevoUsuario.id,
                especialidad
            });
            return res.status(201).json({ usuario: nuevoUsuario, instructor: nuevoInstructor });
        }

        res.status(400).json({ error: 'Rol inválido' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los usuarios (sin importar su rol)
exports.ObtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener aprendices con paginación
exports.ObtenerAprendices = async (req, res) => {
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
};

// Obtener instructores con paginación
exports.ObtenerInstructores = async (req, res) => {
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
};

// Obtener usuario por ID (ya sea aprendiz o instructor)
exports.ObtenerUsuarioByID = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuarios.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Buscar en aprendices o instructores según el rol
        if (usuario.rol === 'aprendiz') {
            const aprendiz = await Aprendices.findOne({ where: { id_usuario: id } });
            return res.status(200).json({ usuario, aprendiz });
        }

        if (usuario.rol === 'instructor') {
            const instructor = await Instructores.findOne({ where: { id_usuario: id } });
            return res.status(200).json({ usuario, instructor });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar usuario
exports.ActualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, correo, contraseña } = req.body;

        const usuario = await Usuarios.findByPk(id);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        await usuario.update({ nombre, correo, contraseña });

        res.status(200).json({ message: 'Usuario actualizado correctamente', usuario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Marcar usuario como inactivo (eliminar lógicamente)
exports.EliminarUsuario = async (req, res) => {
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
};