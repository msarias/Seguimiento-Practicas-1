// MODELO DE VISITAS EN SEQUELIZE
const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db.js');
// const Aprendiz = require('./Aprendiz');

const Visita = sequelize.define('Visita', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    direccion: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: false,
            len: [2, 100]
        }
    },
    tipo: {
        type: DataTypes.STRING(30),
        allowNull: false,
        /* validate: {
            notEmpty: true,
            isIn: ['presencial', 'telefonica', 'virtual']
        } */
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        /* validate: {
            isDate: true,
            isBefore: new Date.toString(),
        } */
    },
}, {
    timestamps: false
});

module.exports = Visita;