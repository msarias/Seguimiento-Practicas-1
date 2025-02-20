//Configuracion base de datos con un ORM Sequlize
const  {Sequelize} = require('sequelize');
//Importamos las varibles necesarias establecer la conexion a la base de datos desde el archivo .env
const {DB_NAME, DB_PASSWORD, DB_HOST, DB_USER } = process.env;
//Configurar el Sequelize
const sequelize = new Sequelize(DB_NAME,DB_USER,DB_PASSWORD,{
    host:DB_HOST,
    dialect:'mysql',
    logging:false, // Los logs son mesajes que dicen que esta sucediendo
    //muestran las consultas SQL que el ORM ejecuta
});

//verificar la conexion
(async ()=>{
    try{
        await sequelize.authenticate();//Metodo para verificar la conexion
        console.log("La conexion a MySQL con Sequelize exitosa");
    }catch(error){
        console.log('No se pudo conectar a MySQL:',error.message);
    }
});

module.exports = sequelize;
