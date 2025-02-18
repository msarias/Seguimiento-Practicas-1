require('dotenv').config();// Cargar las variables de entorno en todo el servidor
const express = require('express');
const aprendicesRoutes = require('./Routes/aprendicesRutas.js');
const sequelize = require('./Config/db.js')

//const bodyParser = require('body-parser');//Eliminar dependencia cuando sehaga un commit comentar que se elimino 
//const Aprendices = require('./Models/Aprendiz.js');

//Sincronizar con la base de datos
async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Base de datos sincronizada');
    } catch (error) {
        console.log('Error alsincronizar base de datos', error.message);
    }
};


//Crear el servidor
const app = express();

//Habilitar body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Agregar rutas
//app.use('/routes',routes);
app.use('/api', aprendicesRoutes);

//Puerto del servidor
const port = 3001

app.listen(port, () => {
    console.log('Se realizo la conexion en el puerto', port)
});