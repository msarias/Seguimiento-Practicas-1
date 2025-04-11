const express = require("express");
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
require("./Models/Notificacion"); // 💥 Carga el modelo aquí

const sequelize = require("./Config/db.js");
const indexRoutes = require("./Routes/index.routes.js");
const notificacionSocket = require("./Sockets/Notificacion.js");


console.log("EMAIL_USER:", process.env.EMAIL_USER); // Prueba si se carga correctamente
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

dotenv.config();


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // frontend
    methods: ["GET", "POST"]
  }
});

// Inyectar io en todas las peticiones
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Middlewares
app.use(cors());
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


// Base de datos
async function connectDB() {
  try {
    await sequelize.sync({ force: false });
    console.log("Base de datos sincronizada");
  } catch (error) {
    console.log("Error al sincronizar DB:", error.message);
  }
}

connectDB();

// Iniciar sockets
notificacionSocket(io); // función que maneja eventos de conexión

// Servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log("Servidor corriendo en puerto", PORT);
});


