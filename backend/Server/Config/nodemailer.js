// Config/nodemailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();  // Asegúrate de cargar las variables de entorno

// Crear el transportador con la configuración de tu proveedor de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Si usas Gmail, puedes dejarlo así
  auth: {
    user: process.env.EMAIL_USER,  // Utilizamos la variable de entorno
    pass: process.env.EMAIL_PASS,  // Utilizamos la variable de entorno
  },
});

module.exports = transporter;
