const Usuario = require('../Models/Usuario');
const Ficha = require('../Models/Ficha');
const bcrypt = require('bcryptjs');

// Crear un usuario (aprendiz o instructor)
exports.crearUsuario = async (req, res) => {
    try {
        console.log("Datos recibidos:", req.body);

        const { nombres, apellidos, correo, rol, id_empresa, contraseña, identificacion, ficha: codigoFicha, programa } = req.body;

        // Hashear la contraseña
        let hashedPassword = await bcrypt.hash(contraseña, 10);

        // Crear la ficha si no existe
        let ficha = await Ficha.findByPk(codigoFicha);
        if (!ficha) {
            ficha = await Ficha.create({
                codigo: codigoFicha,
                nombre: programa
            });
        }

        const nuevoUsuario = await Usuario.create({
            nombres,
            apellidos,
            correo,
            rol,
            id_empresa: null,
            contraseña: hashedPassword,
            identificacion,
            ficha: codigoFicha
        });

        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Obtener todos los usuarios (sin importar su rol)
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        if (usuarios.length === 0) {
            return res.status(404).json({ message: 'No hay usuarios registrados' });
        }
        return res.status(200).json({ usuarios });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Obtener usuario por ID (ya sea aprendiz o instructor)
exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no existe' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        let { nombres, apellidos, correo, rol, id_empresa, contraseña, identificacion, ficha } = req.body;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Si enviaron contraseña nueva, la hasheas
        if (contraseña && contraseña.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            contraseña = await bcrypt.hash(contraseña, salt);
        } else {
            // Si no mandaron nueva contraseña, mantenés la actual
            contraseña = usuario.contraseña;
        }
        await usuario.update({ nombres, apellidos, correo, rol, id_empresa, contraseña, identificacion, ficha });

        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar (desactivar) aprendiz
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
