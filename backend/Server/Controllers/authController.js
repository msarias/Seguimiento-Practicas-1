require("dotenv").config();
const Usuario = require("../Models/Usuario.js"); // Asegúrate de que está bien importado
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../Config/nodemailer");

// Generar token y enviar correo
exports.forgotPassword = async (req, res) => {
    try {
        const { correo } = req.body;
        const usuario = await Usuario.findOne({ where: { correo } }); // ← CAMBIO: `Usuario` en vez de `Usuarios`

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Generar token con tiempo de expiración
        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Corregir la interpolación del enlace
        const resetLink = `http://localhost:3000/reset-password/${token}`;
        console.log("🔗 Enlace de restablecimiento generado:", resetLink);

        // Configuración del correo
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: usuario.correo,
            subject: "Restablecer contraseña",
            html: `
                <h2>Solicitud de restablecimiento de contraseña</h2>
                <p>Haz click en el enlace para restablecer tu contraseña:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>Si no solicitaste este cambio, ignora este mensaje.</p>
            `,
        };

        // Enviar el correo
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error al enviar el correo:", error);
                return res.status(500).json({ error: "Error al enviar el correo" });
            }
            console.log("Correo enviado:", info.response);
            res.json({ message: "Correo enviado, revisa tu bandeja" });
        });

    } catch (error) {
        console.error("Error en forgotPassword:", error);
        res.status(500).json({ error: "Error al enviar el correo" });
    }
};

// Restablecer contraseña
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findByPk(decoded.id); // ← CAMBIO: `Usuario` en vez de `Usuarios`

        if (!usuario) {
            return res.status(400).json({ message: "Token inválido o expirado" });
        }

        // Cifrar nueva contraseña
        usuario.password = await bcrypt.hash(newPassword, 10);
        await usuario.save();

        res.json({ message: "Contraseña actualizada correctamente" });
    } catch (error) {
        console.error("Error en resetPassword:", error);
        res.status(500).json({ error: "Error al restablecer la contraseña" });
    }
};

// 🔹 Prueba de búsqueda manual
Usuario.findOne({ where: { correo: "londonojefferson04@gmail.com" } })
    .then(usuario => console.log("Usuario encontrado:", usuario))
    .catch(err => console.error("Error al buscar usuario:", err));
