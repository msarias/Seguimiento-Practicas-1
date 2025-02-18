const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db.js');

//Modelo de aprendices
const Aprendiz = sequelize.define('Aprendiz', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },

    id_usuario: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },

    id_empresa: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    //Cambie en el campo id_reporte que se nulo para poder hacer pruebas
    id_reporte: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },

}, {
    tableName: 'aprendiz',
    timestamps: false,
    paranoid: false,
});


module.exports = Aprendiz;
