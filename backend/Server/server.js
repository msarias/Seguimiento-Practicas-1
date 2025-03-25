const express = require("express");
const sequelize = require("./Config/db.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const indexRoutes = require("./Routes/index.routes.js");
const authRoutes = require("./Routes/authRutas.js");

//Sincronizar con la base de datos
// eslint-disable-next-line no-unused-expressions
async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Base de datos sincronizada");
  } catch (error) {
    console.log("Error alsincronizar base de datos", error.message);
  }
};

//Crear el servidor
dotenv.config();
const app = express();
app.use(cors());
//Habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//Agregar rutas
//app.use('/routes',routes);
app.use("/api", indexRoutes);
app.use("/api/auth", authRoutes);

//Puerto del servidor
const port = 3000

app.listen(port, () => {
  console.log("Se realizo la conexion en el puerto", port);
});
