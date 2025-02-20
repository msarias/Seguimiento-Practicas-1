const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db.js');

const Reporte = sequelize.define('reports', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    id_aprendiz: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'aprendiz',
            key: 'id',
        },
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
}, {
    tableName: 'reporte',
    timestamps: false,
});

module.exports = Reporte;
