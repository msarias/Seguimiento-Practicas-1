const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db.js');

const Notificacion = sequelize.define("Notificacion", {
    mensaje: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipoUsuario: {
        type: DataTypes.ENUM("aprendiz", "instructor", "ambos"),
        allowNull: false,
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    leida: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    enviarCorreo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    tipo: {
        type: DataTypes.STRING,
        defaultValue: "info"
    }
}, {
    timestamps: true 
});

module.exports = Notificacion;
