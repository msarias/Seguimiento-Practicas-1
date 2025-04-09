const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db.js');

const Notificacion = sequelize.define("Notificacion",{
    mensaje:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    para:{
        type:DataTypes.ENUM("aprendiz", "instructor", "ambos"),
        allowNull:false,
    },
    leida:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    },
    enviarCorreo:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    },
    tipo:{
        type:DataTypes.STRING,
        defaultValue:"info"
    }
});

module.exports = Notificacion;