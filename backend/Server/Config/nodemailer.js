/* require("dotenv").config();
const nodemailer = require("nodemailer");

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS,
    },
    tls:{
        rejectUnauthorized :  false,
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error("Error en la configuración de Nodemailer:", error);
    } else {
        console.log("Servidor de correo listo para enviar mensajes.");
    }
});

module.exports = transporter; // Exporta solo el transporter sin enviar correos manualmente
 */