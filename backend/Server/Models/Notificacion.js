const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db'); // Instancia de Sequelize

const Notificacion = sequelize.define('Notificacion', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
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
}, {
    tableName: 'notificacion',
    timestamps: false,
});

module.exports = Notificacion;
