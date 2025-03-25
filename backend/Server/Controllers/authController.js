require("dotenv").config();
const Usuario = require("../Models/Usuario.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../Config/nodemailer");

// Función forgotPassword (debe existir antes de exportarla)
const forgotPassword = async (req, res) => {
    try {
        const { correo } = req.body;
        const usuario = await Usuario.findOne({ where: { correo } });

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        const resetLink = `http://localhost:3000/reset-password/${token}`;
        console.log("🔗 Enlace de restablecimiento generado:", resetLink);

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

const resetPassword = async (req, res) => {
    res.json({ message: "Función resetPassword en construcción" });
};


module.exports = {
    forgotPassword,
    resetPassword
};
