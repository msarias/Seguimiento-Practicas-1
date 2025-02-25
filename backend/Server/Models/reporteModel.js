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
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isBefore: new Date().toISOString().split('T')[0],
        }
    },
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            len: [5,30]
        }
    },
}, {
    tableName: 'reporte',
    timestamps: false,
});

module.exports = Reporte;
