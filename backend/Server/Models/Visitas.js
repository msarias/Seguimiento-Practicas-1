// MODELO DE VISITAS EN SEQUELIZE
const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db.js');
const Aprendiz = require('./Aprendiz');

const Visita = sequelize.define('Visita', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    direccion: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: false,
            len: [2, ]
        }
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true,
            isBefore: new Date.toString(),
        }
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    tipo_visita: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: ['presencial', 'telefonica', 'virtual']
        }
    },
    herramienta_reunion : { 
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
            notEmpty: true,
        },
        field: 'herramienta_reunion'
    },
    id_aprendiz: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Aprendiz,
            key: 'id'
        }
    },
}, {
    timestamps: true
});

module.exports = Visita;