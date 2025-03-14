const nodemailer = require("nodemailer");
require("dotenv").config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,  // Tu correo
        pass: process.env.EMAIL_PASS   // Tu contraseña o clave de aplicación
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error("Error en la configuración de Nodemailer:", error);
    } else {
        console.log("Servidor de correo listo para enviar mensajes.");
    }
});

module.exports = transporter;
