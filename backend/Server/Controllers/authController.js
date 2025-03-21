require("dotenv").config();
const Usuario = require("../Models/Usuario.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../Config/nodemailer");
console.log("📧 Transporter configurado:", transporter);

exports.forgotPassword = async (req, res) => {
    try {
        console.log("Iniciando proceso de recuperación...");
        const { correo } = req.body;
        if (!correo) return res.status(400).json({ error: "Correo es requerido" });

        const usuario = await Usuario.findOne({ where: { correo } });
        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const resetLink = `http://localhost:3000/reset-password/${token}`;

        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: usuario.correo,
            subject: "Restablecer contraseña",
            html: `<p>Haz click en el enlace para restablecer tu contraseña:</p>
                   <a href="${resetLink}">${resetLink}</a>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return res.status(500).json({ error: "Error al enviar el correo" });
            console.log("Correo enviado:", info.response);
            res.json({ message: "Correo enviado, revisa tu bandeja" });
        });

    } catch (error) {
        console.error("Error en forgotPassword:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

// Aquí define resetPassword también
exports.resetPassword = async (req, res) => {
    try {
        console.log("🔑 Procesando restablecimiento de contraseña...");
        const { token } = req.params;
        const { nuevaContrasena } = req.body;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usuario = await Usuario.findByPk(decoded.id);
        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

        usuario.contrasena = await bcrypt.hash(nuevaContrasena, 10);
        await usuario.save();

        res.json({ message: "Contraseña restablecida con éxito" });
    } catch (error) {
        console.error("Error en resetPassword:", error);
        res.status(500).json({ error: "Token inválido o expirado" });
    }
};
