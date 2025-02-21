// MODELO DE VISITAS EN SEQUELIZE
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Aprendiz = require('./Aprendiz');

const Visita = sequelize.define('Visita', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    id_aprendiz: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Aprendiz,
            key: 'id'
        }
    },
    // tipo_visita: {
    //     type: DataTypes.ENUM('presencial', 'telefónica', 'virtual'),
    //     allowNull: false
    // },
    // herramienta: {
    //     type: DataTypes.ENUM('Teams', 'Meet', 'Zoom', 'Otro'),
    //     allowNull: true
    // }
}, {
    timestamps: true
});

module.exports = Visita;