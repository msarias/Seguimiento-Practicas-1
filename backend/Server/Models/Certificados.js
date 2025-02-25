const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db.js');

const Certificados = sequelize.define('Certificados', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    id_aprendiz: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: 'aprendiz',
            key: 'id'
        }
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    estado: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
            isIn: ['Activo', 'Pendiente']
        }
    }
}, {
    tableName: 'certificacion', 
    timestamps: false, 
    paranoid: false,
});

module.exports = Certificados;
