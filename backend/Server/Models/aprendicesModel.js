const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db.js');

//Modelo de aprendices
const Aprendices = sequelize.define('aprendices', {
    id: {

        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true,
    },

    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    id_empresa: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    //Cambie en el campo id_reporte que se nulo para poder hacer pruebas
    id_reporte: {
        type: DataTypes.INTEGER,
        allowNull: false

    },

}, {
    tableName: 'aprendiz',
    timestamps: false,
});


module.exports = Aprendices;
