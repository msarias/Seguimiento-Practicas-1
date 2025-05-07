const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db'); // Asegúrate de importar tu instancia de Sequelize

const Notificacion = sequelize.define('Notificacion', {
    mensaje: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_usuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'leida'),
        defaultValue: 'pendiente',
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: true, // Puedes usar 'visita', 'bitacora', etc.
    },
}, {
    tableName: 'notificacion',
});

module.exports = Notificacion;
