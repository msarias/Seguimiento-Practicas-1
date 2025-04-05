const express = require("express");
const sequelize = require("./Config/db.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const indexRoutes = require("./Routes/index.routes.js");
const authRoutes = require("./Routes/authRutas.js");

require('dotenv').config();

console.log("EMAIL_USER:", process.env.EMAIL_USER); // Prueba si se carga correctamente
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

//Sincronizar con la base de datos

async function connectDB() {
  try {
    await sequelize.sync({ force: false });
    console.log("Base de datos sincronizada");
  } catch (error) {
    console.log("Error al sincronizar base de datos:", error.message);
  }
}

connectDB();


//Crear el servidor
dotenv.config();
const app = express();
app.use(cors());
app.use(cors({ origin: "http://localhost:3001" }));
//Habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//Agregar rutas
//app.use('/routes',routes);
app.use("/api", indexRoutes);
// app.use("/",(req,res)=>{
//   console.log("Hola");
//   return res.status(200).json({message:"Hola"});
// })
//app.use("/api/auth", authRoutes);

//Puerto del servidor
const port = 3000

app.listen(port, () => {
  console.log("Se realizo la conexion en el puerto", port);
});
