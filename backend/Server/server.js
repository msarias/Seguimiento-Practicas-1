const express = require("express");
const sequelize = require("./Config/db.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

// Cargar variables de entorno
dotenv.config(); // Puedes usar directamente dotenv.config() sin require("dotenv").config()

// Importar rutas
const indexRoutes = require("./Routes/index.routes.js");

// Importar y ejecutar asociaciones entre modelos
require('./Models/Asociaciones');

// Crear el servidor
const app = express();

// Conexión a la base de datos
async function connectDB() {
  try {
    await sequelize.sync({ force: false }); // Cambiar a true si quieres reiniciar DB
    console.log("Base de datos sincronizada");
  } catch (error) {
    console.log("Error al sincronizar base de datos:", error.message);
  }
}
connectDB();

// Middleware
app.use(cors({ origin: "http://localhost:3001" })); // Cambiar si usas otro front
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos desde la carpeta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use("/api", indexRoutes); // Acceso a /api/fichas, /api/usuarios, etc.

// Puerto del servidor
const port = 3000;
app.listen(port, () => {
  console.log("Servidor conectado en el puerto", port);
});
